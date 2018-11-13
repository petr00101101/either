var express = require("express");
var mongoose = require("mongoose");
var Info = require("./models/Info");
var values = require("./models/values");
var User = require("./models/user");

let myDatabase = function () {
    this.question = [];
    this.currQuestion = 0;

    this.question.push(
        { left: "Live in a castle", right: "Live in the White House" },
        { left: "Sit for 2 years", right: "Stand for 2 years" },
        { left: "Be friends with the pope", right: "be friends with the dalai lama" },
        { left: "Have a Kangaroo pouch", right: "Have a monkey tail" },
        { left: "Meet Morgan Freeman", right: "Meet John Wayne" },
        { left: "Swallow 3 jawbreakers", right: "Inhale a candy cane" },
        { left: "Walk barefoot in a lego factory", right: "Walk on burning coals" },
        { left: "Sneaze on every left step you take", right: "Cry on every right step you take" },
        { left: "Golf", right: "Shuffleboard" },
        { left: "Ford", right: "Chevy" },
        { left: "Car of your dreams", right: "Helicopter of your dreams" });
    for (let i = 0; i < this.question.length; i++) {
        Info.create({
            left: this.question[i].left,
            right: this.question[i].right,
            rightValue: 0,
            leftValue: 0,
        })
    }

}
myDatabase.prototype.changeCurrQuestion = function (left) {
    console.log("changeCurrQuestionCalled");
Info.find({}, function (error, info) {
        if (error) {
            return res.json(null);
        } else {
            let objs = [];
            for (let i = 0; i < info.length; i++) {
                objs.push({ left: info[i].left, right: info[i].right });
            }
            for (let i = 0; i < objs.length; i++) {
                        if(objs[i].left == left)
                        {
                            
                            //console.log(this.currQuestion)
                            this.currQuestion = i;
                        return (true);
                    }
                    }
            

        }
    });


}
myDatabase.prototype.getQuestion = function (res) {
    Info.find({}, function (error, info) {
        if (error) {
            return res.json(null);
        } else {
            let objs = [];
            for (let i = 0; i < info.length; i++) {
                objs.push({ left: info[i].left, right: info[i].right });
                if (this.currQuestion < info.length) {
                    if (this.currQuestion < objs.length) {
                        let tempQuest = objs[this.currQuestion]
                        this.currQuestion++;
                        return res.json(tempQuest)
                    }
                }
                else {
                    this.currQuestion = 0;
                }
            }

        }
    });
}
myDatabase.prototype.addQuestion = function (obj, res) {
    Info.create(obj, function (error, info) {

        if (error) {
            return res.json(null);
        }
        let obj2 = { left: obj.left, right: obj.right, leftValue:0, rightValue:0 };
        return res.json(obj2);
    });
}



myDatabase.prototype.getForPerson = function (res, name) {
    User.findOne({ username: name }, function (error, info) {
        if (error) {
            return res.json(null);
        } else {
            return res.json(info.left, info.right);
        }
    });
}
myDatabase.prototype.addBlueToPerson = function (res, name, value) {
    var number = parseInt(value);
    var newNumber = number + 1;
    User.findOneAndUpdate({ username: name }, { right: newNumber }, function (error, info) {
        if (error) {
            return res.json(null);
        } else {
            return res.json(info.left);
        }
    });
}

myDatabase.prototype.addRedToPerson = function (res, name, value) {
    var number = parseInt(value);
    var newNumber = number + 1;
    User.findOneAndUpdate({ username: name }, { left: newNumber }, function (error, info) {
        if (error) {
            return res.json(null);
        } else {
            return res.json(info.left);
        }
    });
}

myDatabase.prototype.addObjectsRED = function (res, value, word) {
    var number = parseInt(value);
    var newNumber = number + 1;
    Info.findOneAndUpdate({ left: word }, { leftValue: newNumber }, function (error, info) {
        if (error) {
            return res.json(null);
        } else {
            //console.log("info is: "+info);
            //console.log("red is: " + info.leftValue);
            return res.json(info.leftValue);
        }
    });
}
myDatabase.prototype.addObjectsBLUE = function (res, value, word) {
    console.log("hi");
    var number = parseInt(value);
    var newNumber = number + 1;
    Info.findOneAndUpdate({ right: word }, { rightValue: newNumber }, function (error, info) {
        if (error) {
            return res.json(null);
        } else {
            //console.log("blue is: "+  info.rightValue);
            return res.json(info.rightValue);
        }
    });
}

myDatabase.prototype.getRedObject = function (res, word) {
    Info.findOne({ left: word }, function (error, info) {
        if (error) {
            return res.json(null);
        } else {
            //console.log("infois: "+info);
            //console.log(info);
            return res.json(info.leftValue);
        }
    });
}
myDatabase.prototype.getBlueObject = function (res, word) {
    Info.findOne({ right: word }, function (error, info) {
        if (error) {
            return res.json(null);
        } else {
            //console.log("infois: "+info);
            //console.log(info.value);
            return res.json(info.rightValue);
        }
    });
}

myDatabase.prototype.getValues = function (res, questionLeft) {

    Info.findOne({ left: questionLeft }, function (error, info) {
        if (error) {
            return res.json(null);
        } else {
            //console.log("infois: "+info);
            //console.log(info.value);
            var Obj = [];
            Obj.push(info.leftValue, info.rightValue);
            return res.json(Obj);
        }
    });
}

myDatabase.prototype.changeQuestion = function (index, options, res) {
    Info.find({}, function (error, info) {
        if (error) {
            return res.json(null);
        } else {
            let objs = [];
            for (let i = 0; i < info.length; i++) {
                objs.push({ left: info[i].left, right: info[i].right });
            }
            Info.findOneAndUpdate({ left: objs[index].left, right: objs[index].right }, { left: options.left, right: options.right }, function (error, info) {
                if (error) {
                    return res.json(null);
                }
                else if (info == null) {
                    return res.json(null);
                }
                return res.json(options);
            });
        }
    });
}

myDatabase.prototype.deleteQuestion = function (index, res) {
    //find the actual question
    Info.find({}, function (error, info) {
        if (error) {
            return res.json(null);
        } else {
            Info.remove({ left: info[index].left }, function (error, removed) {
                if (error) {
                    return res.json(null);
                }
                return res.json(removed.result);
            });
        }
    });
}
myDatabase.prototype.returnQuestions = function (res) {
    //return (this.question);
    Info.find({}, function (error, info) {
        if (error) {
            return res.json(null);
        } else {
            let objs = [];
            for (let i = 0; i < info.length; i++) {
                objs.push({ left: info[i].left, right: info[i].right });
            }
            return res.json(objs);
        }
    });
}
myDatabase.prototype.getSpecificComment = function (left, res) {
    Info.find({}, function (error, info) {
        if (error) {
            return res.json(null);
        } else {
            for (let i = 0; i < info.length; i++) {
                if (info[i].left == left) {
                    let objs = [];
                    for (let j = 0; j < info[i].comment.length; j++) {
                        objs.push({ comment: info[i].comment[j] })
                    }
                    return res.json(objs)
                }
            }

        }
    });
}
myDatabase.prototype.addComment = function (leftQ, newComment, res) {
    console.log(leftQ)
    console.log(newComment.user)
    Info.find({}, function (error, info) {
        if (error) {
            return res.json(null);
        } else {
            for (let i = 0; i < info.length; i++) {
                if (info[i].left == leftQ) {
                    let objs = [];
                    for (let j = 0; j < info[i].comment.length; j++) {
                        objs.push(info[i].comment[j])
                    }
                    objs.push(newComment)
                    console.log("the list: "+objs);
                    Info.findOneAndUpdate({ left: leftQ }, { comment: objs }, function (error, info) {
                        if (error) {
                            return res.json(null);
                        }
                        else if (info == null) {
                            return res.json(null);
                        }
                        return res.json(newComment);
                    });
                }
            }
        }
    });
}

module.exports = myDatabase;
