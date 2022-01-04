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
  res.render("main");
})

router.get("/getFlight",function(req,res){
  var from = req.query.from;
  from=from.toUpperCase();
  var to=req.query.to;
  to=to.toUpperCase();
  var radio=req.query.radio; 
  var outDate=req.query.outDate;
  var inDate=req.query.inDate;
  var currency=req.query.currency;
  var noOfPass=req.query.noOfPass;
  var adults=req.query.adults;
  var children=req.query.children;
  var cclass= req.query.cclass;
  console.log(radio,from,to,outDate,inDate,currency,noOfPass,adults,children,cclass);
  
  var options = {
    method: 'GET',
    url: 'https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v2/prices/latest',
    params: {
      destination: to,
      origin: from,
      period_type: 'year',
      one_way: radio,
      departure_at :outDate,
      return_at:(radio=1)?"":inDate,
      show_to_affiliates: 'true',
      trip_class: cclass,
      currency: currency,
      page: '1',
      sorting: 'price',
      limit: '30'
    },
    headers: {
      'x-access-token': '34e3341ff352d84c7286e4f5aaf10d68',
      'x-rapidapi-host': 'travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com',
      'x-rapidapi-key': '59d537498cmsh540febb1e080a20p1cc820jsna77d63ddc05b'
    }
  };
  var logos=["/images/qantas-airways-logo-5.png","/images/Flydubai-Logo.png","/images/download.png","/images/Etihad-Airways-Logo-2003.jpg","/images/thai.png","/images/Qatar-Airways-Logo.png"]
  var carriers = ["Qantas Airways","FlyDubai","Shrilankan","Etihad Airways","Thai Airways","Qatar Airways"]
  axios.request(options).then(function (response) {
    // console.log(response.data);
    var index = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    var quotes =[];
    for(var i =0; i<15; i++ ){
       quotes.push(response.data.data[i]);
      // console.log(quotes[i], "number of qoute "+i);
      }
    
    res.render("getFlights",{quotes,carriers,logos,currency});
  }).catch(function (error) {
    console.error(error);
  });
    
})

router.get("/about",(req,res)=>{
  res.render("about")
})

router.get("/termsandconditions",(req,res)=>{
  res.render("termsandconditions")
})

router.get("/privacypolicy",(req,res)=>{
  res.render("privacypolicy")
})

router.get("/faq",(req,res)=>{
  res.render("faq")
})
router.get("/paymentandcancellation",(req,res)=>{
  res.render("payment")
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});



