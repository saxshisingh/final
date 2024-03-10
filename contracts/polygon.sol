// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PolygonWallet {
    mapping(address => uint256) public balances;
    IERC20 public token;

    event Deposit(address indexed sender, uint256 amount);
    event Withdrawal(address indexed recipient, uint256 amount);

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    function deposit(uint256 _amount) external {
        require(_amount > 0, "Deposit amount must be greater than zero");

        // Transfer tokens from sender to this contract
        require(token.transferFrom(msg.sender, address(this), _amount), "Failed to transfer tokens");

        // Update sender's balance
        balances[msg.sender] += _amount;

        // Emit deposit event
        emit Deposit(msg.sender, _amount);
    }

    function withdraw(address _recipient, uint256 _amount) external {
        require(_amount > 0, "Withdrawal amount must be greater than zero");
        require(balances[msg.sender] >= _amount, "Insufficient balance");

        // Transfer tokens from this contract to recipient
        require(token.transfer(_recipient, _amount), "Failed to transfer tokens");

        // Update sender's balance
        balances[msg.sender] -= _amount;

        // Emit withdrawal event
        emit Withdrawal(_recipient, _amount);
    }

    function balanceOf(address _address) external view returns (uint256) {
        return balances[_address];
    }
}
