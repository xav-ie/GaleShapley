var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var allNodes;
var globalHeight;
var playStopButton, stepButton, slowerButton, fasterButton, addButton, deleteButton;
var isPlaying = false;
var sleepTime = 5;
function setup() {
    createCanvas(windowWidth, windowHeight);
    globalHeight = windowHeight * 0.75;
    background(0);
    stroke(255);
    noFill();
    allNodes = new GaleShapleyNodeGroup(7, "men", "women");
    playStopButton = createButton('▶');
    playStopButton.mousePressed(playStop);
    stepButton = createButton('⇥');
    stepButton.mousePressed(step);
    slowerButton = createButton('<<');
    slowerButton.mousePressed(slower);
    fasterButton = createButton('>>');
    fasterButton.mousePressed(faster);
    addButton = createButton('+');
    addButton.mousePressed(addNode);
    deleteButton = createButton('-');
    deleteButton.mousePressed(deleteNode);
    var buttonHeight = (windowHeight - globalHeight) / 2;
    var buttonWidth = windowWidth / 5;
    styleElement(playStopButton, ["width", buttonWidth + "px", "height", buttonHeight + "px", "background-color", "white", "border", "none", "left", "0", "bottom", "0", "position", "fixed"]);
    styleElement(stepButton, ["width", buttonWidth + "px", "height", buttonHeight + "px", "background-color", "white", "border", "none", "left", buttonWidth + "px", "bottom", "0", "position", "fixed"]);
    styleElement(slowerButton, ["width", buttonWidth + "px", "height", buttonHeight + "px", "background-color", "white", "border", "none", "left", (buttonWidth * 2) + "px", "bottom", "0", "position", "fixed"]);
    styleElement(fasterButton, ["width", buttonWidth + "px", "height", buttonHeight + "px", "background-color", "white", "border", "none", "left", (buttonWidth * 3) + "px", "bottom", "0", "position", "fixed"]);
    styleElement(addButton, ["width", buttonWidth + "px", "height", (buttonHeight / 2) + "px", "background-color", "white", "border", "none", "left", (buttonWidth * 4) + "px", "bottom", (buttonHeight / 2) + "px", "position", "fixed"]);
    styleElement(deleteButton, ["width", buttonWidth + "px", "height", (buttonHeight / 2) + "px", "background-color", "white", "border", "none", "left", (buttonWidth * 4) + "px", "bottom", "0", "position", "fixed"]);
}
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function playStop() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!isPlaying) return [3 /*break*/, 4];
                    playStopButton.elt.innerHTML = "||";
                    isPlaying = true; // button is now clicked, set to playing state
                    _a.label = 1;
                case 1:
                    if (!(allNodes.groupA.currentNode < allNodes.groupA.numNodes - 1)) return [3 /*break*/, 3];
                    return [4 /*yield*/, sleep(sleepTime)];
                case 2:
                    _a.sent();
                    if (!isPlaying)
                        return [3 /*break*/, 3];
                    allNodes.groupA.propose();
                    if (allNodes.groupA.currentNode == allNodes.groupA.numNodes - 1) {
                        playStopButton.elt.innerHTML = "◻️";
                        isPlaying = false;
                        playStopButton.elt.disabled = true;
                        stepButton.elt.disabled = true;
                        allNodes.groupA.currentNode = -1;
                    }
                    return [3 /*break*/, 1];
                case 3: return [3 /*break*/, 5];
                case 4:
                    playStopButton.elt.innerHTML = "▶";
                    isPlaying = false;
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
function step() {
    allNodes.groupA.propose();
    if (allNodes.groupA.currentNode == allNodes.groupA.numNodes - 1) {
        stepButton.elt.disabled = true;
        playStopButton.elt.innerHTML = "◻️";
        isPlaying = false;
        playStopButton.elt.disabled = true;
        allNodes.groupA.currentNode = -1;
    }
}
function slower() {
    var newSpeed = sleepTime * 2;
    if (newSpeed < 5000) {
        sleepTime = newSpeed;
        fasterButton.elt.disabled = false;
    }
    else {
        slowerButton.elt.disabled = true;
    }
}
function faster() {
    var newSpeed = sleepTime / 2;
    if (newSpeed > 5) {
        sleepTime = newSpeed;
        slowerButton.elt.disabled = false;
    }
    else {
        fasterButton.elt.disabled = true;
    }
}
function addNode() {
    allNodes = new GaleShapleyNodeGroup(allNodes.numNodes + 1, "men", "women");
}
function deleteNode() {
    allNodes = new GaleShapleyNodeGroup(allNodes.numNodes - 1, "men", "women");
}
function draw() {
    allNodes.draw();
}
function styleElement(element, styles) {
    if (styles.length == 0 || styles.length % 2 !== 0) {
        throw "Styles array is not evenly sized or is empty!";
    }
    if (!element) {
        throw "Please pass in an element";
    }
    for (var i = 0; i < styles.length; i += 2) {
        element.style(styles[i], styles[i + 1]);
    }
}
var GaleShapleyNodeGroup = /** @class */ (function () {
    function GaleShapleyNodeGroup(numNodes, groupA, groupB) {
        this.numNodes = numNodes;
        this.groupA = new NodeGroup(numNodes, groupA, true);
        this.groupB = new NodeGroup(numNodes, groupB, false);
    }
    GaleShapleyNodeGroup.prototype.draw = function () {
        background(0);
        this.groupA.draw();
        translate(windowWidth / 2, 0);
        this.groupB.draw();
        translate(-windowWidth / 2, 0);
    };
    return GaleShapleyNodeGroup;
}());
var NodeGroup = /** @class */ (function () {
    function NodeGroup(numNodes, groupName, proposing) {
        this.currentNode = -1;
        this.numNodes = numNodes;
        this.groupName = groupName;
        this.proposingType = proposing;
        this.nodes = [];
        for (var i = 0; i < numNodes; i++) {
            this.nodes.push(new Node(numNodes, i));
        }
    }
    NodeGroup.prototype.propose = function () {
        this.currentNode++;
        this.nodes[this.currentNode].propose();
        // console.log(this.nodes[this.currentNode].ranks);
    };
    NodeGroup.prototype.draw = function () {
        var r = min(globalHeight / this.numNodes, windowWidth / 2);
        if (this.proposingType) {
            fill(0, 150, 200);
        }
        else {
            fill(200, 0, 150);
        }
        for (var i = 0; i < this.numNodes; i++) {
            var isProposing = false;
            if (i == this.currentNode && this.proposingType) {
                isProposing = true;
            }
            this.nodes[i].draw(windowWidth / 4, r / 2 + i * r, r * 0.9, isProposing, this.proposingType);
        }
    };
    return NodeGroup;
}());
var Node = /** @class */ (function () {
    function Node(numNodes, id) {
        this.numNodes = numNodes;
        this.ranks = Array(numNodes).fill(0).map(function (_, i) { return i; });
        for (var i = this.ranks.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.ranks[i];
            this.ranks[i] = this.ranks[j];
            this.ranks[j] = temp;
        }
        this.currentPartner = -1;
        this.currentBestRank = 1;
        this.id = id;
    }
    Node.prototype.propose = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nextProposal, proposalResult;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.currentPartner == -1)) return [3 /*break*/, 2];
                        nextProposal = this.ranks.findIndex(function (element) { return element == _this.currentBestRank; });
                        console.log("node", this.id, "is about to propose to node", nextProposal);
                        console.log("preference list of node", this.id, ":", this.ranks);
                        this.currentBestRank++;
                        return [4 /*yield*/, allNodes.groupB.nodes[nextProposal].receiveProposal(this)];
                    case 1:
                        proposalResult = _a.sent();
                        if (proposalResult) {
                            this.currentPartner = allNodes.groupB.nodes[nextProposal];
                        }
                        else {
                            if (this.currentBestRank > this.numNodes) {
                                console.log("FATAL; you will die alone mr node");
                            }
                            else {
                                this.propose();
                            }
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Node.prototype.receiveProposal = function (suitor) {
        return __awaiter(this, void 0, void 0, function () {
            var rankOfSuitor, rankOfCurrentPartner;
            var _this = this;
            return __generator(this, function (_a) {
                console.log("node", this.id, "is being proposed to by node", suitor.id);
                if (this.currentPartner == -1) {
                    console.log("node", this.id, "has no partner yet so it will take node", suitor.id, "as its partner");
                    this.currentPartner = suitor;
                    return [2 /*return*/, true];
                }
                console.log("node", this.id, "has node", this.currentPartner.id, "as its partner");
                rankOfSuitor = this.ranks.findIndex(function (e) { return e == suitor.id; });
                console.log("rank of suitor node", suitor.id, ":", rankOfSuitor);
                rankOfCurrentPartner = this.ranks.findIndex(function (e) { return e == _this.currentPartner.id; });
                console.log("rank of current partner node", this.currentPartner.id, ":", rankOfCurrentPartner);
                if (rankOfSuitor < rankOfCurrentPartner) {
                    console.log("the rank of suitor node", suitor.id, "is less than current partner node", this.currentPartner.id);
                    this.currentPartner.propose();
                    this.currentPartner = suitor;
                    return [2 /*return*/, true];
                }
                console.log("sorry suitor node", suitor.id, "you must find another partner");
                return [2 /*return*/, false];
            });
        });
    };
    Node.prototype.draw = function (x, y, radius, isProposing, proposingType) {
        strokeWeight(50 / this.numNodes);
        if (this.currentPartner != -1 && proposingType) {
            line(x, y, windowWidth * .75, calculatePartnerY(this.currentPartner.id, this.numNodes));
        }
        if (isProposing) {
            strokeWeight(50 / this.numNodes);
        }
        else {
            strokeWeight(10 / this.numNodes);
        }
        ellipse(x, y, radius);
    };
    return Node;
}());
function windowResized() {
    globalHeight = windowHeight * .75;
    resizeCanvas(windowWidth, windowHeight);
    var buttonHeight = (windowHeight - globalHeight) / 2;
    var buttonWidth = windowWidth / 5;
    styleElement(playStopButton, ["width", buttonWidth + "px", "height", buttonHeight + "px", "background-color", "white", "border", "none", "left", "0", "bottom", "0", "position", "fixed"]);
    styleElement(stepButton, ["width", buttonWidth + "px", "height", buttonHeight + "px", "background-color", "white", "border", "none", "left", buttonWidth + "px", "bottom", "0", "position", "fixed"]);
    styleElement(slowerButton, ["width", buttonWidth + "px", "height", buttonHeight + "px", "background-color", "white", "border", "none", "left", (buttonWidth * 2) + "px", "bottom", "0", "position", "fixed"]);
    styleElement(fasterButton, ["width", buttonWidth + "px", "height", buttonHeight + "px", "background-color", "white", "border", "none", "left", (buttonWidth * 3) + "px", "bottom", "0", "position", "fixed"]);
    styleElement(addButton, ["width", buttonWidth + "px", "height", (buttonHeight / 2) + "px", "background-color", "white", "border", "none", "left", (buttonWidth * 4) + "px", "bottom", (buttonHeight / 2) + "px", "position", "fixed"]);
    styleElement(deleteButton, ["width", buttonWidth + "px", "height", (buttonHeight / 2) + "px", "background-color", "white", "border", "none", "left", (buttonWidth * 4) + "px", "bottom", "0", "position", "fixed"]);
}
function calculatePartnerY(index, numNodes) {
    var r = min(globalHeight / numNodes, windowWidth / 2);
    return r / 2 + index * r;
}
// makes random preference matrix size nxn
function makePreferenceMatrix(n) {
    var preferenceMatrix = [];
    for (i = 0; i < n; i++) {
        var rankArr = Array(n).fill(0).map(function (_, i) { return i; });
        preferenceMatrix.push(shuffleArray(rankArr));
    }
    return preferenceMatrix;
}
function shuffleArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}
// let N = 5;
function stableMarriage(preferenceMatrix) {
    var N = preferenceMatrix.size;
    var wPartner = Array(N).fill(0).map(function (_, i) { return -1; });
    var mFree = Array(N).fill(0).map(function (_, i) { return false; });
    var freeCount = preferenceMatrix.length;
    while (freeCount > 0) {
        var m = 0;
        while (m < N) {
            if (mFree[m] == false) {
                break;
            }
            m += 1;
        }
        //One by one go to all women according to  
        //m's preferences. Here m is the picked free man 
        for (var i = 0; i < N && mFree[m] == false; i++) {
            var w = prefer[m][i];
            // The woman of preference is free,  
            // w and m become partners (Note that  
            // the partnership maybe changed later).  
            // So we can say they are engaged not married 
            if (wPartner[w - N] == -1) {
                wPartner[w - N] = m;
                mFree[m] = true;
                freeCount--;
            }
            else { // w is not free
                // Find current engagement of w  
                var m1 = wPartner[w - N];
                // If w prefers m over her current engagement m1,  
                // then break the engagement between w and m1 and  
                // engage m with w.  
                if (wPrefersM1OverM(prefer, w, m, m1) == false) {
                    wPartner[w - N] = m;
                    mFree[m] = true;
                    mFree[m1] = false;
                }
            }
        }
    }
    console.log("woman\tman");
}
