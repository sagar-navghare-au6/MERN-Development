const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us18.api.mailchimp.com/3.0/lists/2c0279b765";
  const options = {
    method: "POST",
    auth: "sagar:780191cff29d8f1c7228696f361fd404-us18",
  };
  var request = https.request(url, options, function (response) {
    response.on("data", function (data) {
     // console.log(JSON.parse(data));
     if(response.statusCode===200){
       res.sendFile(__dirname + "/success.html");
     }
     else{
       res.sendFile(__dirname + "/failure.html");
     }
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/")
})

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

