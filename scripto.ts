import "https://CDN.JSDelivr.net/g/p5.js(p5.min.js+addons/p5.dom.js";

let allNodes;
let globalHeight;
let playStopButton, stepButton, slowerButton, fasterButton, addButton, deleteButton;
let isPlaying = false;
let sleepTime = 5;

function setup() {
    createCanvas(windowWidth, windowHeight);
    globalHeight = windowHeight*0.75;
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
    
    let buttonHeight = (windowHeight-globalHeight)/2;
    let buttonWidth = windowWidth/5;
    styleElement(playStopButton, ["width", buttonWidth+"px", "height", buttonHeight+"px", "background-color", "white", "border", "none", "left", "0", "bottom", "0", "position", "fixed"]);
    styleElement(stepButton,     ["width", buttonWidth+"px", "height", buttonHeight+"px", "background-color", "white", "border", "none", "left", buttonWidth+"px", "bottom", "0", "position", "fixed"]);
    styleElement(slowerButton,   ["width", buttonWidth+"px", "height", buttonHeight+"px", "background-color", "white", "border", "none", "left", (buttonWidth*2)+"px", "bottom", "0", "position", "fixed"]);
    styleElement(fasterButton,   ["width", buttonWidth+"px", "height", buttonHeight+"px", "background-color", "white", "border", "none", "left", (buttonWidth*3)+"px", "bottom", "0", "position", "fixed"]);
    styleElement(addButton,      ["width", buttonWidth+"px", "height", (buttonHeight/2)+"px", "background-color", "white", "border", "none", "left", (buttonWidth*4)+"px", "bottom", (buttonHeight/2)+"px", "position", "fixed"]);
    styleElement(deleteButton,   ["width", buttonWidth+"px", "height", (buttonHeight/2)+"px", "background-color", "white", "border", "none", "left", (buttonWidth*4)+"px", "bottom", "0", "position", "fixed"]);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
async function playStop() {
    if(!isPlaying) { // before button is clicked
        playStopButton.elt.innerHTML = "||";
        isPlaying = true; // button is now clicked, set to playing state
        while(allNodes.groupA.currentNode<allNodes.groupA.numNodes-1){
            await sleep(sleepTime);
            if(!isPlaying) break;
            allNodes.groupA.propose();
            if(allNodes.groupA.currentNode==allNodes.groupA.numNodes-1) {
                playStopButton.elt.innerHTML = "◻️";
                isPlaying = false;
                playStopButton.elt.disabled = true;
                stepButton.elt.disabled = true;
                allNodes.groupA.currentNode = -1;
            }

            
            // console.log("isPlaying?->"+isPlaying);
            // console.log("currentNode:"+allNodes.groupA.currentNode);
            
        }
        

    } else {
        playStopButton.elt.innerHTML = "▶";
        isPlaying = false;
    }
}




function step() {
    allNodes.groupA.propose();
    if(allNodes.groupA.currentNode==allNodes.groupA.numNodes-1){
        stepButton.elt.disabled = true;
        playStopButton.elt.innerHTML = "◻️";
        isPlaying = false;
        playStopButton.elt.disabled = true;
        allNodes.groupA.currentNode = -1;
    }
       

}

function slower(){
    let newSpeed = sleepTime*2;
    if (newSpeed<5000) {
        sleepTime = newSpeed;
        fasterButton.elt.disabled = false;
    } else {
        slowerButton.elt.disabled = true;
    }
}

function faster() {
    let newSpeed = sleepTime/2;
    if (newSpeed>5) {
        sleepTime = newSpeed;
        slowerButton.elt.disabled = false;
    } else {
        fasterButton.elt.disabled = true;
    }
}

function addNode() {
    allNodes = new GaleShapleyNodeGroup(allNodes.numNodes+1, "men", "women");
}

function deleteNode() {
    allNodes = new GaleShapleyNodeGroup(allNodes.numNodes-1, "men", "women");
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

class GaleShapleyNodeGroup {
    constructor(numNodes, groupA, groupB) {
        this.numNodes = numNodes;
        this.groupA = new NodeGroup(numNodes, groupA, true);
        this.groupB = new NodeGroup(numNodes, groupB, false);
    }

    draw() {
        background(0);
        this.groupA.draw();
        translate(windowWidth/2, 0);
        this.groupB.draw();
        translate(-windowWidth/2, 0);
    }
}


class NodeGroup {
    constructor(numNodes, groupName, proposing){
        this.currentNode = -1;
        this.numNodes = numNodes;
        this.groupName = groupName;
        this.proposingType = proposing;
        this.nodes = [];
        for(let i=0; i<numNodes; i++){
            this.nodes.push(new Node(numNodes, i));
        }
    }

    propose() {
        this.currentNode++;
        this.nodes[this.currentNode].propose();
        // console.log(this.nodes[this.currentNode].ranks);
    }

    draw() {
        let r = min(globalHeight/this.numNodes, windowWidth/2);
        if(this.proposingType){
            fill(0,150,200);
        } else {
            fill(200,0,150);
        }
        
        for(let i=0; i<this.numNodes; i++){
            let isProposing = false;
            if(i==this.currentNode && this.proposingType){
                isProposing = true;
            }
            
            this.nodes[i].draw(windowWidth/4, r/2+i*r, r*0.9, isProposing, this.proposingType);
        }
    }
}

class Node{
    constructor(numNodes, id) {
        this.numNodes = numNodes;
        this.ranks = Array(numNodes).fill(0).map((_, i) => i);
        for (let i = this.ranks.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.ranks[i];
            this.ranks[i] = this.ranks[j];
            this.ranks[j] = temp;
        }
        this.currentPartner = -1;
        this.currentBestRank = 1;
        this.id = id;
    }

    async propose(){
        if(this.currentPartner==-1){
            let nextProposal = this.ranks.findIndex((element) => element == this.currentBestRank);
            console.log("node", this.id, "is about to propose to node", nextProposal);
            console.log("preference list of node", this.id, ":", this.ranks);
            this.currentBestRank++;
            let proposalResult = await allNodes.groupB.nodes[nextProposal].receiveProposal(this);
            if(proposalResult){
                this.currentPartner = allNodes.groupB.nodes[nextProposal];
            } else {
                if(this.currentBestRank>this.numNodes){
                    console.log("FATAL; you will die alone mr node")
                } else {
                    this.propose();
                }
            }
        }
    }

    async receiveProposal(suitor) {
        console.log("node", this.id, "is being proposed to by node", suitor.id);
        if(this.currentPartner==-1){
            console.log("node", this.id, "has no partner yet so it will take node", suitor.id, "as its partner");
            this.currentPartner=suitor;
            return true;
        }
        console.log("node", this.id, "has node", this.currentPartner.id, "as its partner");
        let rankOfSuitor = this.ranks.findIndex((e)=>e==suitor.id);
        console.log("rank of suitor node", suitor.id, ":", rankOfSuitor);
        let rankOfCurrentPartner = this.ranks.findIndex((e)=>e==this.currentPartner.id);
        console.log("rank of current partner node", this.currentPartner.id, ":", rankOfCurrentPartner);

        if(rankOfSuitor<rankOfCurrentPartner){
            console.log("the rank of suitor node", suitor.id, "is less than current partner node", this.currentPartner.id);
            this.currentPartner.propose();
            this.currentPartner = suitor;
            return true;
        }
        console.log("sorry suitor node", suitor.id, "you must find another partner");
        return false;
    }

    draw(x, y, radius, isProposing, proposingType){
        strokeWeight(50/this.numNodes);
        if(this.currentPartner!=-1 && proposingType){
            line(x,y,windowWidth*.75,calculatePartnerY(this.currentPartner.id, this.numNodes));
        }
        if(isProposing){
            strokeWeight(50/this.numNodes);
        } else {
            strokeWeight(10/this.numNodes);
        }
        ellipse(x,y,radius);
    }
}


function windowResized(){
    globalHeight = windowHeight*.75;
    resizeCanvas(windowWidth, windowHeight);
    let buttonHeight = (windowHeight-globalHeight)/2;
    let buttonWidth = windowWidth/5;
    styleElement(playStopButton, ["width", buttonWidth+"px", "height", buttonHeight+"px", "background-color", "white", "border", "none", "left", "0", "bottom", "0", "position", "fixed"]);
    styleElement(stepButton,     ["width", buttonWidth+"px", "height", buttonHeight+"px", "background-color", "white", "border", "none", "left", buttonWidth+"px", "bottom", "0", "position", "fixed"]);
    styleElement(slowerButton,   ["width", buttonWidth+"px", "height", buttonHeight+"px", "background-color", "white", "border", "none", "left", (buttonWidth*2)+"px", "bottom", "0", "position", "fixed"]);
    styleElement(fasterButton,   ["width", buttonWidth+"px", "height", buttonHeight+"px", "background-color", "white", "border", "none", "left", (buttonWidth*3)+"px", "bottom", "0", "position", "fixed"]);
    styleElement(addButton,      ["width", buttonWidth+"px", "height", (buttonHeight/2)+"px", "background-color", "white", "border", "none", "left", (buttonWidth*4)+"px", "bottom", (buttonHeight/2)+"px", "position", "fixed"]);
    styleElement(deleteButton,   ["width", buttonWidth+"px", "height", (buttonHeight/2)+"px", "background-color", "white", "border", "none", "left", (buttonWidth*4)+"px", "bottom", "0", "position", "fixed"]);
}

function calculatePartnerY(index, numNodes) {
    let r = min(globalHeight/numNodes, windowWidth/2);
    return r/2+index*r;
} 

// makes random preference matrix size nxn
function makePreferenceMatrix(n){
    let preferenceMatrix = [];
    for(i=0; i<n; i++){
        let rankArr = Array(n).fill(0).map((_, i) => i);
        preferenceMatrix.push(shuffleArray(rankArr));
    }
    return preferenceMatrix;
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

// let N = 5;
function stableMarriage(preferenceMatrix) {
    let N = preferenceMatrix.size;
    let wPartner = Array(N).fill(0).map((_, i) => -1);
    let mFree = Array(N).fill(0).map((_, i) => false);
    let freeCount = preferenceMatrix.length;

    while (freeCount>0) {
        let m=0;
        while (m < N){
            if (mFree[m] == false){
                break;
            }
            m += 1;
        } 

        //One by one go to all women according to  
        //m's preferences. Here m is the picked free man 
        for (let i = 0; i < N && mFree[m] == false; i++){
            let w = prefer[m][i];
  
            // The woman of preference is free,  
            // w and m become partners (Note that  
            // the partnership maybe changed later).  
            // So we can say they are engaged not married 
            if (wPartner[w - N] == -1){
                wPartner[w - N] = m;
                mFree[m] = true;
                freeCount--;
            } else { // w is not free
                // Find current engagement of w  
                let m1 = wPartner[w - N];  
  
                // If w prefers m over her current engagement m1,  
                // then break the engagement between w and m1 and  
                // engage m with w.  
                if (wPrefersM1OverM(prefer, w, m, m1) == false)  
                {  
                    wPartner[w - N] = m;  
                    mFree[m] = true;  
                    mFree[m1] = false;  
                }  
            }
        }
    }

    console.log("woman\tman");



}