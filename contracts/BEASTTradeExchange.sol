// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20Token {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

/**
 * @title BEASTTradeExchange
 * @notice Automated Market Maker (AMM) liquidity pool and resource trade exchange
 * for BEAST System 3.0.
 * @dev Handles LUCR token liquidity pools, resource credit swaps, and fee distribution.
 */
contract BEASTTradeExchange {
    address public owner;
    address public lucrToken;
    
    // Liquidity pool reserves
    uint256 public lucrReserve;
    uint256 public resourceCreditReserve;
    uint256 public totalLiquidityShares;

    mapping(address => uint256) public liquidityShares;

    event LiquidityAdded(address indexed provider, uint256 lucrAmount, uint256 creditAmount, uint256 sharesMinted);
    event LiquidityRemoved(address indexed provider, uint256 lucrAmount, uint256 creditAmount, uint256 sharesBurned);
    event ResourceSwapped(address indexed trader, uint256 lucrIn, uint256 creditsOut, uint256 feePaid);

    modifier onlyOwner() {
        require(msg.sender == owner, "BEASTTrade: Caller is not owner");
        _;
    }

    constructor(address _lucrToken) {
        owner = msg.sender;
        lucrToken = _lucrToken;
    }

    /**
     * @notice Adds liquidity to the LUCR / Resource Credit pool.
     */
    function addLiquidity(uint256 lucrAmount, uint256 creditAmount) external returns (uint256) {
        require(lucrAmount > 0 && creditAmount > 0, "BEASTTrade: Invalid liquidity amounts");

        IERC20Token(lucrToken).transferFrom(msg.sender, address(this), lucrAmount);

        uint256 shares;
        if (totalLiquidityShares == 0) {
            shares = lucrAmount; // Initial share mint
        } else {
            shares = (lucrAmount * totalLiquidityShares) / lucrReserve;
        }

        liquidityShares[msg.sender] += shares;
        totalLiquidityShares += shares;

        lucrReserve += lucrAmount;
        resourceCreditReserve += creditAmount;

        emit LiquidityAdded(msg.sender, lucrAmount, creditAmount, shares);
        return shares;
    }

    /**
     * @notice Swaps LUCR tokens for resource credits using constant product formula.
     */
    function swapLUCRForCredits(uint256 lucrIn) external returns (uint256) {
        require(lucrIn > 0, "BEASTTrade: Invalid swap amount");
        require(lucrReserve > 0 && resourceCreditReserve > 0, "BEASTTrade: Insufficient pool liquidity");

        IERC20Token(lucrToken).transferFrom(msg.sender, address(this), lucrIn);

        // 0.3% fee applied to trade
        uint256 fee = (lucrIn * 3) / 1000;
        uint256 lucrInAfterFee = lucrIn - fee;

        uint256 creditsOut = (resourceCreditReserve * lucrInAfterFee) / (lucrReserve + lucrInAfterFee);
        require(creditsOut > 0, "BEASTTrade: Output amount too low");

        lucrReserve += lucrIn;
        resourceCreditReserve -= creditsOut;

        emit ResourceSwapped(msg.sender, lucrIn, creditsOut, fee);
        return creditsOut;
    }
}
