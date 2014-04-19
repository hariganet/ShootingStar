#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    //指定したポートで接続
    receiver.setup( PORT );
    ofSetFrameRate(60);
    
    //値を初期化
    remoteMouseX = -1;
    remoteMouseY = -1;
    isReceive = false;
    
    ofBackground(0, 0, 0);
    ofSetBackgroundAuto(false);
    ofSetLineWidth(5);

}

//--------------------------------------------------------------
void ofApp::update(){
    
    prevRemoteMouseX = remoteMouseX;
    prevRemoteMouseY = remoteMouseY;
    
    //現在順番待ちのOSCメッセージがあるか確認
    while( receiver.hasWaitingMessages() )
    {
        //次のメッセージを取得
        ofxOscMessage m;
        oscString = m.getAddress();
        receiver.getNextMessage( &m );
        
        //マウスの位置を取得
        if ( m.getAddress() == "/mouse/position" ){
            remoteMouseX = m.getArgAsFloat( 0 ) * ofGetWidth();
            remoteMouseY = m.getArgAsFloat( 1 ) * ofGetHeight();
            isReceive = true;
        }

        //OSCメッセージをそのままコンソールに出力
        //dumpOSC(m);
    }
    
}

//--------------------------------------------------------------
void ofApp::draw(){
    
    ofSetColor(0, 0, 0, 10);
    ofRect(0, 0, ofGetWidth(), ofGetHeight());
    
    if(isReceive && prevRemoteMouseX >= 0){
        ofSetColor(0, 255, 80);
        ofLine(remoteMouseX, remoteMouseY, prevRemoteMouseX, prevRemoteMouseY);
    }
}

//OSCメッセージをコンソールに出力する関数
void ofApp::dumpOSC(ofxOscMessage m) {
    string msg_string;
    msg_string = m.getAddress();
    for (int i=0; i<m.getNumArgs(); i++ ) {
        msg_string += " ";
        if(m.getArgType(i) == OFXOSC_TYPE_INT32)
            msg_string += ofToString( m.getArgAsInt32(i));
        else if(m.getArgType(i) == OFXOSC_TYPE_FLOAT)
            msg_string += ofToString( m.getArgAsFloat(i));
        else if(m.getArgType(i) == OFXOSC_TYPE_STRING)
            msg_string += m.getArgAsString(i);
    }
    cout << msg_string << endl;
}


//--------------------------------------------------------------
void ofApp::keyPressed(int key){
    
    if(key == 'f'){
        ofToggleFullscreen();
    }
    
}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
