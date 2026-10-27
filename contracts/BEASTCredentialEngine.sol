// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC5192 {
    event Locked(uint256 tokenId);
    event Unlocked(uint256 tokenId);
    function locked(uint256 tokenId) external view returns (bool);
}

/**
 * @title BEASTCredentialEngine
 * @notice Issues and manages Soulbound Tokens (ERC-5192) and verifiable credentials
 * for civic participation and family preservation in BEAST System 3.0.
 * @dev Non-transferable tokens tied directly to member identity hashes.
 */
contract BEASTCredentialEngine is IERC5192 {
    string public name = "BEAST Verifiable Credential SBT";
    string public symbol = "BEAST-SBT";

    address public governingAuthority;
    uint256 public credentialCounter;

    struct Credential {
        uint256 credentialId;
        address recipient;
        string credentialType; // e.g., "FAMILY_PRESERVATION", "CIVIC_AUDITOR"
        string metadataIPFSHash;
        uint256 issuanceTimestamp;
        bool isRevoked;
    }

    mapping(uint256 => Credential) public credentials;
    mapping(address => uint256[]) public recipientCredentials;
    mapping(uint256 => address) public tokenOwner;

    event CredentialIssued(uint256 indexed credentialId, address indexed recipient, string credentialType);
    event CredentialRevoked(uint256 indexed credentialId);

    modifier onlyAuthority() {
        require(msg.sender == governingAuthority, "BEASTCredential: Caller is not issuer authority");
        _;
    }

    constructor() {
        governingAuthority = msg.sender;
    }

    /**
     * @notice ERC-5192 conformance: All credentials are permanently locked (Soulbound).
     */
    function locked(uint256 tokenId) external view override returns (bool) {
        require(tokenOwner[tokenId] != address(0), "BEASTCredential: Token does not exist");
        return !credentials[tokenId].isRevoked;
    }

    /**
     * @notice Issues a new non-transferable Soulbound Credential.
     */
    function issueCredential(
        address recipient,
        string calldata credentialType,
        string calldata metadataIPFSHash
    ) external onlyAuthority returns (uint256) {
        require(recipient != address(0), "BEASTCredential: Invalid recipient address");

        credentialCounter++;
        uint256 newId = credentialCounter;

        credentials[newId] = Credential({
            credentialId: newId,
            recipient: recipient,
            credentialType: credentialType,
            metadataIPFSHash: metadataIPFSHash,
            issuanceTimestamp: block.timestamp,
            isRevoked: false
        });

        tokenOwner[newId] = recipient;
        recipientCredentials[recipient].push(newId);

        emit Locked(newId);
        emit CredentialIssued(newId, recipient, credentialType);
        return newId;
    }

    /**
     * @notice Revokes an active credential in case of constitutional policy violation.
     */
    function revokeCredential(uint256 credentialId) external onlyAuthority {
        Credential storage cred = credentials[credentialId];
        require(cred.credentialId != 0, "BEASTCredential: Credential does not exist");
        require(!cred.isRevoked, "BEASTCredential: Credential already revoked");

        cred.isRevoked = true;
        emit Unlocked(credentialId); // ERC-5192 status change indicator on revocation
        emit CredentialRevoked(credentialId);
    }
}
