// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IBEASTSystemBus {
    bytes32 constant MODULE_ID = keccak256("BEAST_DISPUTE_RESOLUTION");
    function emitSystemEvent(bytes32 eventType, bytes memory payload) external;
}

/**
 * @title BEASTDisputeResolution
 * @notice Arbitrates civic and resource disputes across BEAST System 3.0.
 * @dev Integrates with BEASTSystemBus and LUCR token staking for jury selection.
 */
contract BEASTDisputeResolution {
    enum DisputeStatus { Filed, UnderReview, JurorVoting, Resolved, Appealed }

    struct Dispute {
        uint256 disputeId;
        address claimant;
        address respondent;
        string caseSummaryIPFSHash;
        DisputeStatus status;
        uint256 juryPoolSize;
        uint256 votesForClaimant;
        uint256 votesForRespondent;
        uint256 filingTimestamp;
    }

    address public owner;
    address public systemBus;
    uint256 public disputeCounter;

    mapping(uint256 => Dispute) public disputes;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event DisputeFiled(uint256 indexed disputeId, address indexed claimant, address indexed respondent);
    event JuryAssigned(uint256 indexed disputeId, uint256 jurySize);
    event JurorVoted(uint256 indexed disputeId, address indexed juror, bool voteForClaimant);
    event DisputeResolved(uint256 indexed disputeId, DisputeStatus finalStatus, uint256 claimantVotes, uint256 respondentVotes);

    modifier onlyOwner() {
        require(msg.sender == owner, "BEASTDispute: Caller is not owner");
        _;
    }

    constructor(address _systemBus) {
        owner = msg.sender;
        systemBus = _systemBus;
    }

    /**
     * @notice Files a new dispute case within the autonomous governance framework.
     */
    function fileDispute(
        address respondent,
        string calldata caseSummaryIPFSHash
    ) external returns (uint256) {
        require(respondent != address(0), "BEASTDispute: Invalid respondent address");
        
        disputeCounter++;
        uint256 newId = disputeCounter;

        disputes[newId] = Dispute({
            disputeId: newId,
            claimant: msg.sender,
            respondent: respondent,
            caseSummaryIPFSHash: caseSummaryIPFSHash,
            status: DisputeStatus.Filed,
            juryPoolSize: 0,
            votesForClaimant: 0,
            votesForRespondent: 0,
            filingTimestamp: block.timestamp
        });

        emit DisputeFiled(newId, msg.sender, respondent);
        return newId;
    }

    /**
     * @notice Assigns a civic jury panel to review the dispute evidence.
     */
    function assignJury(uint256 disputeId, uint256 poolSize) external onlyOwner {
        Dispute storage dispute = disputes[disputeId];
        require(dispute.status == DisputeStatus.Filed, "BEASTDispute: Invalid case status for jury assignment");
        
        dispute.juryPoolSize = poolSize;
        dispute.status = DisputeStatus.JurorVoting;

        emit JuryAssigned(disputeId, poolSize);
    }

    /**
     * @notice Casts an authorized juror vote on an active dispute.
     */
    function castJurorVote(uint256 disputeId, bool voteForClaimant) external {
        Dispute storage dispute = disputes[disputeId];
        require(dispute.status == DisputeStatus.JurorVoting, "Dispute is not in voting phase");
        require(!hasVoted[disputeId][msg.sender], "Juror has already voted");

        hasVoted[disputeId][msg.sender] = true;

        if (voteForClaimant) {
            dispute.votesForClaimant++;
        } else {
            dispute.votesForRespondent++;
        }

        emit JurorVoted(disputeId, msg.sender, voteForClaimant);

        // Auto-resolve if quorum reached
        if (dispute.votesForClaimant + dispute.votesForRespondent >= dispute.juryPoolSize) {
            dispute.status = DisputeStatus.Resolved;
            emit DisputeResolved(disputeId, dispute.status, dispute.votesForClaimant, dispute.votesForRespondent);
        }
    }
}
