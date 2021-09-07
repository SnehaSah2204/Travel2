const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");




const app = express();
const router = express.Router();

app.use(router);

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(express.static("public"));
var axios = require("axios").default;



app.get("/",function(req,res){
  res.render("page1");
})

router.get("/getFlight",function(req,res){
  var from = req.query.from;
  var to=req.query.to;
  var radio=req.query.radio; 
  var outDate=req.query.outDate;
  var currency=req.query.currency;
  var noOfPass=req.query.noOfPass;
  var adults=req.query.adults;
  var children=req.query.children;
  var eclass= req.query.eclass;
  if(currency==1){
    currency = "INR";
  }else if(currency==2){
    currency = "USD";
  }else{
    currency = "EUR";
  }
  var options = {
    method: 'GET',
    url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/IN/${currency}/en-US/${from}/${to}/${outDate}`,
    // params: {inboundpartialdate: inDate},
    headers: {
      'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
      'x-rapidapi-key': '59d537498cmsh540febb1e080a20p1cc820jsna77d63ddc05b'
    }
  };
  
  if(currency=="INR"){
    currency = "₹";
  }else if(currency == "USD"){
    currency = "$";
  }else{
    currency= "€";
  }

  axios.request(options).then(function (response) {
    res.render("page2",{quotes:response.data.Quotes, carriers:response.data.Carriers,to:to,from:from, curr:currency});
   }).catch(function (error) {
    // console.error(error);
  });
   
})

router.get("/about",(req,res)=>{
  res.render("page3",{aboutheading:"About Us",aboutimage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTIUO5-IFhIdPoJQ59NXclTTERSM4WI9T_EQ&usqp=CAU"})
})
router.get("/destinations",(req,res)=>{
  res.render("page3",{aboutheading:"Popular Tourist Attractions",aboutimage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf9ecNMV0T6SckOB1VJTQ1kIvVM7L1DjTUoQ&usqp=CAU"})
})


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});


