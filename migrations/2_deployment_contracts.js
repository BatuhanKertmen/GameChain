gameToken = artifacts.require('GameToken')
videoGames = artifacts.require('VideoGames')


module.exports = async function(deployer, network, accounts) {

    function tokens(number) {
        return web3.utils.toWei(number, 'ether')
    }


    await deployer.deploy(gameToken)
    const gametoken = await gameToken.deployed()

    await deployer.deploy(videoGames)

    await gametoken.transfer(accounts[0], tokens('3'))
}