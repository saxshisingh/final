// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.19;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract TetherWallet {
    mapping(address => uint256) public balances;
    IERC20 public tether;

    event Deposit(address indexed sender, address indexed recipient, uint256 amount);
    event Withdrawal(address indexed recipient, uint256 amount);

    constructor(address _tetherAddress) {
        tether = IERC20(_tetherAddress);
    }

    function deposit(uint256 _amount, address _toAddress) external {
        require(_amount > 0, "Deposit amount must be greater than zero");
        
        // Transfer tokens from sender to contract
        tether.transferFrom(msg.sender, address(this), _amount);

        balances[_toAddress] += _amount;
        emit Deposit(msg.sender, _toAddress, _amount);
    }

    function withdraw(uint256 _amount, address _fromAddress) external {
        require(_amount > 0, "Withdrawal amount must be greater than zero");
        require(balances[_fromAddress] >= _amount, "Insufficient balance");

        // Transfer tokens from contract to sender
        tether.transfer(_fromAddress, _amount);

        balances[_fromAddress] -= _amount;
        emit Withdrawal(_fromAddress, _amount);
    }

    function getBalance(address _address) external view returns (uint256) {
        return balances[_address];
    }
}
