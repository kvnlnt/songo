Chordynator.Map = (function(me){

    // 5 x 5 grid of 15x15 "plots" evenly spaced in 100 x 100 canvas taking up 70% of volume
    function getMapLayout(){

        var layout, plots, arrows, flows = null;
        var types = Chordynator.Key.chord_options;

        // flow arrows
        flows = {
            00:[],
            01:[{ to:06, x1:30.5, y1:20, x2:30.5, y2:23 }],
            02:[{ to:07, x1:48.5, y1:20, x2:48.5, y2:23 }],
            03:[{ to:08, x1:66.5, y1:20, x2:66.5, y2:23 }],
            04:[],
            05:[{ to:06, x1:20, y1:30.5, x2:23, y2:30.5 }],
            06:[{ to:07, x1:38, y1:30.5, x2:41, y2:30.5 }, { to:12, x1:38, y1:38, x2:41, y2:41 }],
            07:[{ to:08, x1:56, y1:30.5, x2:59, y2:30.5 }],
            08:[{ to:13, x1:66.5, y1:38, x2:66.5, y2:41 }],
            09:[{ to:08, x1:77, y1:30.5, x2:74, y2:30.5 }],
            10:[{ to:11, x1:20, y1:48.5, x2:23, y2:48.5 }],
            11:[{ to:06, x1:30.5, y1:41, x2:30.5, y2:38 }],
            12:[],
            13:[{ to:18, x1:66.5, y1:56, x2:66.5, y2:59 }],
            14:[{ to:13, x1:77, y1:48.5, x2:74, y2:48.5 }],
            15:[{ to:16, x1:20, y1:66.5, x2:23, y2:66.5 }],
            16:[{ to:11, x1:30.5, y1:59, x2:30.5, y2:56 }, { to:12, x1:38, y1:59, x2:41, y2:56 }],
            17:[{ to:16, x1:41, y1:66.5, x2:38, y2:66.5 }],
            18:[{ to:17, x1:59, y1:66.5, x2:56, y2:66.5 }, { to:12, x1:59, y1:59, x2:56, y2:56 }],
            19:[{ to:18, x1:77, y1:66.5, x2:74, y2:66.5 }],
            20:[],
            21:[{ to:16, x1:30.5, y1:77, x2:30.5, y2:74 }],
            22:[{ to:17, x1:48.5, y1:77, x2:48.5, y2:74 }],
            23:[{ to:18, x1:66.5, y1:77, x2:66.5, y2:74 }],
            24:[]
        };

        // plots aka chords
        plots = [

            // row 1                                    // col
            { x:05, y:05, twin:null, chord:null, types:types.secondary[null],   flows:flows[00], class:'settings' }, // 0
            { x:23, y:05, twin:null, chord:null, types:types.secondary[01],     flows:flows[01], class:'plot' }, // 1
            { x:41, y:05, twin:null, chord:null, types:types.secondary[02],     flows:flows[02], class:'plot' }, // 2
            { x:59, y:05, twin:null, chord:null, types:types.secondary[03],     flows:flows[03], class:'plot' }, // 3
            { x:77, y:05, twin:null, chord:null, types:types.secondary[null],   flows:flows[04], class:'plot tertiery' }, // 4
            // row 2
            { x:05, y:23, twin:null, chord:null, types:types.secondary[04],     flows:flows[05], class:'plot' }, // 5  
            { x:23, y:23, twin:17,   chord:0001, types:types.primary[1],        flows:flows[06], class:'plot primary' }, // 6  
            { x:41, y:23, twin:16,   chord:0005, types:types.primary[5],        flows:flows[07], class:'plot primary' }, // 7  
            { x:59, y:23, twin:null, chord:0003, types:types.primary[3],        flows:flows[08], class:'plot primary' }, // 8  
            { x:77, y:23, twin:null, chord:null, types:types.secondary[05],     flows:flows[09], class:'plot' }, // 9
            // row 3
            { x:05, y:41, twin:null, chord:null, types:types.secondary[06],     flows:flows[10], class:'plot' }, // 10 
            { x:23, y:41, twin:13,   chord:0006, types:types.primary[6],        flows:flows[11], class:'plot primary' }, // 11  
            { x:41, y:41, twin:null, chord:0001, types:types.primary[1],        flows:flows[12], class:'plot primary' }, // 12  
            { x:59, y:41, twin:11,   chord:0006, types:types.primary[6],        flows:flows[13], class:'plot primary' }, // 13  
            { x:77, y:41, twin:null, chord:null, types:types.secondary[07],     flows:flows[14], class:'plot' }, // 14
            // row 4
            { x:05, y:59, twin:null, chord:null, types:types.secondary[08],     flows:flows[15], class:'plot' }, // 15 
            { x:23, y:59, twin:07,   chord:0005, types:types.primary[5],        flows:flows[16], class:'plot primary' }, // 16  
            { x:41, y:59, twin:06,   chord:0002, types:types.primary[2],        flows:flows[17], class:'plot primary' }, // 17  
            { x:59, y:59, twin:null, chord:0004, types:types.primary[4],        flows:flows[18], class:'plot primary' }, // 18  
            { x:77, y:59, twin:null, chord:null, types:types.secondary[09],     flows:flows[19], class:'plot' }, // 19
            // row 5
            { x:05, y:77, twin:null, chord:null, types:types.secondary[null],   flows:flows[20], class:'options' }, // 20
            { x:23, y:77, twin:null, chord:null, types:types.secondary[10],     flows:flows[21], class:'plot' }, // 21  
            { x:41, y:77, twin:null, chord:null, types:types.secondary[11],     flows:flows[22], class:'plot' }, // 22  
            { x:59, y:77, twin:null, chord:null, types:types.secondary[12],     flows:flows[23], class:'plot' }, // 23  
            { x:77, y:77, twin:null, chord:null, types:types.secondary[null],   flows:flows[24], class:'tertieries' }  // 24

        ]; 

        layout = {  
            chartWidth:77,
            innerMargin:3,
            outerMargin:2,
            chordSize:15,
            plots:plots
        };

        return layout;
    }

    // exports
    me.getMapLayout = getMapLayout;

    return me; 

}(Chordynator.Map || {}));