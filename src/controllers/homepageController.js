import request from "request";
require("dotenv").config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
let getHomepage = (req, res) =>{
    return res.render("homepage.ejs");
};

let getFacebookUserProfile = (req, res) =>{

    return res.render("profile.ejs");
};

let setUpUserFacebookProfile = (req, res) => {
    // Send the HTTP request to the Messenger Platform
    let data = {
        "get_started": {
            "payload": "GET_STARTED"
        },
        "persistent_menu": [
            {
                "locale": "default",
                "composer_input_disabled": false,
                "call_to_actions": [
                    {
                        "type": "postback",
                        "title": "Parler à un agent",
                        "payload": "CARE_HELP"
                    },
                    {
                        "type": "postback",
                        "title": "Epices suggerer",
                        "payload": "CURATION"
                    },
                    {
                        "type": "web_url",
                        "title": "Acheter maintenant",
                        "url": "https://vepaar.store/epiceriebucosbio",
                        "webview_height_ratio": "full"
                    }
                ]
            }
        ],
        "whitelisted_domains":[
            "https://busy-gold-gecko-sock.cyclic.app/",
          ]
    };
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messenger_profile",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": data
      }, (err, res, body) => {
        if (!err) {
          return res.status(200).json({
            message: "Tout est Ok!"
          })
        } else {
          return res.status(500).json({
            "message": "Erreur du serveur"
          })
        }
      }); 
    return res.status(200).json({
        message:"OK"
    });
};
module.exports = {
    getHomepage: getHomepage,
    getFacebookUserProfile: getFacebookUserProfile,
    setUpUserFacebookProfile: setUpUserFacebookProfile
};