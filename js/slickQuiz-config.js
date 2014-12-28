// Setup your quiz text and questions here

// NOTE: pay attention to commas, IE struggles with those bad boys
 // *** include images

 //try again gives same questions in same order - DO NOT USE TRY AGAIN BUTTON without explanation
 
var quizJSON = {
    "info": {
        "name":    "Constellations 101 Quiz",
        "main":    "<p>How well do you know constellations? Find out with this quiz!</p>",
        "results": "<h5>Learn More</h5><p>Don't forget to visit the Further Learning page!</p>",
        "level1":  "Constellation Superstar!",
        "level2":  "Constellation Contender",
        "level3":  "Constellation Amateur",
        "level4":  "Constellation Newbie",
        "level5":  "There's always next time!" // no comma here
    },
    "questions": [

       

        { // Question 1 - Multiple Choice, Single True Answer
            "q": "The night sky is divided into how many constellations?",
            "a": [
                {"option": "68",      "correct": false},
                {"option": "78",     "correct": false},
                {"option": "88",      "correct": true},
                {"option": "98",     "correct": false} // no comma here
            ],
            "correct": "<p><span>That's right! The sky consists of 88 constellations.</span> The night sky was divided by the the International Astronomical Union in 1930.</p>",
//            "incorrect": "<p><span>Not quite</span></p>" 
        },
        { // Question 2 - Multiple Choice, Multiple True Answers, Select Any
            "q": "The center of our galaxy lies in the direction of which constellation?",
            "a": [
                {"option": "Leo",                       "correct": false},
                {"option": "Virgo",                     "correct": false},
                {"option": "Gemini",                    "correct": false},
                {"option": "Sagittarius",               "correct": true} // no comma here
            ],
            "select_any": true,
            "correct": "<p><span>Nice! The center of our galaxy, the Milky Way, lies in the direction of Sagittarius. </span>The Milky Way occupies an area that includes 30 constellations.</p>",
  //          "incorrect": "<p><span>Nope</span></p>" 
        },

        { // Question 3
            "q": "How many of our constellations are named in The Almagest by Ptolemy?",
            "a": [
                {"option": "28",        "correct": false},
                {"option": "38",        "correct": false},
                {"option": "48",        "correct": true},
                {"option": "58",        "correct": false} // no comma here
            ],
            "correct": "<p><span>Good job! 48 of our constellations are named in The Almagest.</span> Almagest contains a catalogue of 1,022 stars whose positions in the sky are described by constellations.</p>",
    //        "incorrect": "<p><span>Not exactly</span></p>"
        },

        { // Question 4 - Multiple Choice, Multiple True Answers, Select All
            "q": "What is the meaning of the Latin word stella?",
            "a": [
                {"option": "Galaxy",           "correct": false},
                {"option": "Star",                  "correct": true},
                {"option": "Night",             "correct": false},
                {"option": "Shape",          "correct": false} // no comma here
            ],
            "correct": "<p><span>Brilliant! Stella is the Latin word for star.</span> Constellation comes from the Latin words com, meaning with and stella, meaning star.</p>",
    //        "incorrect": "<p><span>Nope</span></p>" // no comma here
        },

        
        { // Question 5 - Multiple Choice, Single True Answer
            "q": "The largest constellation shares its name with which Dorney Park roller coaster?",
            "a": [
                {"option": "Talon",      "correct": false},
                {"option": "Hydra",     "correct": true},
                {"option": "Hercules",      "correct": false},
                {"option": "Thunderhawk",     "correct": false} // no comma here
            ],
            "correct": "<p><span>That's right! Hydra is the largest constellation.</span> The smallest constellation, Crux, consists of four stars. </p>",
      //      "incorrect": "<p><span>Nice try</span></p>" // no comma here
        },

        { // Question 6 - Multiple Choice, Single True Answer
            "q": "True or false? There is a constellation named after every sign of the zodiac.",
            "a": [
                {"option": "True",      "correct": true},
                {"option": "False",     "correct": false} // no comma here
            ],
            "correct": "<p><span>Correct! Every sign of the zodiac has its own constellation.</span> Ancient cultures divided times of the year into constellations present in the night sky at the time. We still follow a version of the zodiac in modern times.</p>",
    //        "incorrect": "<p><span>Nope</span></p>" // no comma here
        },

        { // Question 7 - Multiple Choice, Single True Answer
            "q": "Which of the following constellations is named after one of Orion's hunting dogs in Greek mythology?",
            "a": [
                {"option": "Cassiopeia",      "correct": false},
                {"option": "Aquila",     "correct": false},
                {"option": "Canis Major",      "correct": true},
                {"option": "Mensa",     "correct": false} // no comma here
            ],
            "correct": "<p><span>Way to go! Canis Major is one of Orion's hunting dogs.</span> Canis Minor is another constellation that is named after a hunting dog of Orion.</p>",
      //      "incorrect": "<p><span>Not quite</span></p>" // no comma here
        },

        { // Question 8 - Multiple Choice, Single True Answer
            "q": "Which of the following ancient cultures created constellations? Check all that apply.",
            "a": [
                {"option": "Greek",      "correct": true},
                {"option": "Egyptian",     "correct": true},
                {"option": "Indian",      "correct": true},
                {"option": "Chinese",     "correct": true} // no comma here
            ],
            "correct": "<p><span>Right! The Greek, Egyptian, Indian, and Chinese cultures created constellations.</span> Nearly every ancient culture has traced patterns in the night sky. However, very few have traced the same patterns.</p>",
   //         "incorrect": "<p><span>Not exactly</span></p>" // no comma here
        },

        { // Question 9 - Multiple Choice, Single True Answer
            "q": "Which constellation is named after a Greek princess that was chained to a rock as a punishment for her mother's hubris?",
            "a": [
                {"option": "Cetus",      "correct": false},
                {"option": "Andromeda",     "correct": true},
                {"option": "Sagitta",      "correct": false},
                {"option": "Libra",     "correct": false} // no comma here
            ],
            "correct": "<p><span>Good going! The answer is Andromeda.</span> Andromeda is brightest during fall evenings in the Northern Hemisphere.</p>",
     //       "incorrect": "<p><span>Nope</span></p>" // no comma here
        },

        { // Question 10 - Multiple Choice, Single True Answer
            "q": "Mark all of the true statements.",
            "a": [
                {"option": "Canopus, the second largest star, is located in the Carina constellation.",      "correct": true},
                {"option": "The Big Dipper is located in the constellation of Ursa Major.",     "correct": true},
                {"option": "Sirius, the brightest star in the sky, is located in the Canis Major constellation.",      "correct": true},
                {"option": "The Big Dipper is located in the constellation of Ursa Minor.",     "correct": false} // no comma here
            ],
            "correct": "<p><span>Fantastic! The Big Dipper is located in Ursa Major, not Ursa Minor.</span> That was a difficult one!</p>",
       //     "incorrect": "<p><span>Nice try</span></p>" // no comma here
        }

    ]
};
