pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

 contract VideoGames {
    
    address owner;
    uint public GameCounter;
    
    struct VideoGame {
        address producerAddress;
        string name;
        string producer;
        string description;
        string imageLink;
        uint price;
    }
    
    mapping(address => VideoGame[]) public  VideoGamesOf;
    VideoGame[] public AllVideoGames;

    constructor ()  payable public  {
        owner = msg.sender;
    }
  
    modifier onlyOwner() {
        require(msg.sender == owner);
        _; 
    }

    modifier OwnerProducer(VideoGame[] memory AllVideoGames, string memory _name) {
        bool value = true;

        VideoGame memory videoGame;
        for(uint i = 0; i < AllVideoGames.length; i++)
        {
            videoGame = AllVideoGames[i];
            if(compareStringsbyBytes(videoGame.name,_name))
            {
                value = false;
            }
        }

        require(value);
        _;
    }

    event AddGames(address indexed _producerAddress, string indexed _name, string indexed _producer, string _description, string _imageLink, uint _price);


    function compareStringsbyBytes(string memory s1, string memory s2) public pure returns(bool){
    return keccak256(abi.encodePacked(s1)) == keccak256(abi.encodePacked(s2));
        }

    function addGames(address _producerAddress, string memory _name, string memory _producer, string memory _description, string memory _imageLink, uint _price) OwnerProducer(AllVideoGames,_name) public returns (bool success) {
       VideoGame memory videoGame;
       //uint length = VideoGamesOf[_producerAddress].length;

      //VideoGame memory videoGame = VideoGamesOf[_producerAddress][_game_id];//VideoGamesOf[_producerAddress];
       videoGame.producerAddress = _producerAddress;
       videoGame.name = _name;   
       videoGame.producer = _producer;   
       videoGame.description = _description;   
       videoGame.imageLink= _imageLink;   
       videoGame.price = _price; 

       VideoGamesOf[_producerAddress].push(videoGame);
       AllVideoGames.push(videoGame);
       
       emit AddGames(_producerAddress, _name, _producer, _description, _imageLink, _price);
       GameCounter++;
       return true;
    }

    function getGamesInfoBasedProducer(string memory _name) public view returns (address , string memory, string memory ,string memory,string memory, uint ) {
    
    for(uint i = 0; i < AllVideoGames.length; i++)
    {
        if(compareStringsbyBytes(AllVideoGames[i].name,_name))
        {
            VideoGame  memory videoGame = AllVideoGames[i];
            address _producerAddress = videoGame.producerAddress;
            string  memory _name = videoGame.name;
            string memory _producer = videoGame.producer;
            string  memory _description = videoGame.description;
            string  memory _imageLink = videoGame.imageLink;
            uint _price = videoGame.price;
        
            return (_producerAddress, _name, _producer, _description, _imageLink, _price);
        }
        
    }
    return (msg.sender,"wrong","wrong","wrong","wrong",1);
    
    

   }
   function getInfo() external returns(VideoGame [] memory ) 
   {
    
       return(AllVideoGames);
   }


   function deleteGame(address _producerAddress, string memory _name) public payable returns (bool success) {
   
   for(uint i = 0; i < AllVideoGames.length; i++)
    {
        if(compareStringsbyBytes(AllVideoGames[i].name,_name))
        {
            VideoGame  memory videoGame = AllVideoGames[i];
            address curret_producerAddress = videoGame.producerAddress;
            if(curret_producerAddress == _producerAddress)
            {
               for(uint k = 0; k < VideoGamesOf[_producerAddress].length; k++)
               {
                   if(compareStringsbyBytes(VideoGamesOf[_producerAddress][k].name,_name))
                   {
                       VideoGame  memory videoGame2 = VideoGamesOf[_producerAddress][k];
                       address curret_producerAddress2 = videoGame2.producerAddress;
                       if(curret_producerAddress2 == _producerAddress)
                       {
                           delete AllVideoGames[i];
                           delete VideoGamesOf[_producerAddress][k];
                           return true;
                       } 
                   }              
               }
            }
        
        }
        
    }
    return false;
   }

}