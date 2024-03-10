// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.19;



contract EthereumWallet {
    mapping(address => uint256) public balances;

    event Deposit(address indexed sender, address indexed recipient, uint256 amount);
    event Withdrawal(address indexed recipient, uint256 amount);

    function deposit(uint256 _amount, address _toAddress) external payable {
        require(_amount > 0, "Deposit amount must be greater than zero");
        require(msg.value == _amount, "Sent Ether amount must match specified amount");

        balances[_toAddress] += _amount;
        emit Deposit(msg.sender, _toAddress, _amount);
    }

    function withdraw(uint256 _amount, address _fromAddress) external {
        require(_amount > 0, "Withdrawal amount must be greater than zero");
        require(balances[_fromAddress] >= _amount, "Insufficient balance");

        balances[_fromAddress] -= _amount;
        payable(_fromAddress).transfer(_amount);
        emit Withdrawal(_fromAddress, _amount);
    }

    function getBalance(address _address) external view returns (uint256) {
        return balances[_address];
    }
}

