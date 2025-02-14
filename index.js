import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res)=> {
    var renderHeaders ={
        "textFromIndex": "[Text will appear after Start button is clicked.]",
        "runningCode": false,
    }
    res.render("index.ejs", {"passedObject": renderHeaders});
});

app.get("/typing", async (req, res)=> {
    try {
        let result = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single');
        var renderHeaders = {
            "textFromIndex": result.data.joke.replaceAll("/n","<br/>"),
            "runningCode": true,
        };
        res.render("index.ejs", {"passedObject": renderHeaders});
    } catch (error) {
        console.log(`caught an error: ${error}`);
        var renderHeaders = {
            "textFromIndex": error,
            "runningCode": false,
        };
        res.render("index.ejs", {"passedObject": renderHeaders});
    }
});

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});

//5) When I render from the "/typing" endpoint the URL field says "/typing?".
//6) Can I deal with the dash and the umlaut? I think I will replaceAll in the target text and turn the
//characters with accents into plain characters and turn the dash into a double-hyphen.