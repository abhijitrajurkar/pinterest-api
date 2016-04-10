var Const = { ONE_WEEK: 1000 * 60 * 60 * 24 * 7,    
    PIN_APP: '4826889351902276742',
    PIN_FIELDS: 'id,name,image[small]',
    PIN_SCOPE: 'read_public, write_public'
            }

var Pinterest = {
    /*
     *  Use the SDK to login to Pinterest
     *  @param {Function} callback - function fired on completion
     */
    login: function(callback) {
        PDK.login({ scope : Const.PIN_SCOPE }, callback);
    },
    /*
     *  Use the SDK to logout of Pinterest
     */
    logout: function() {
        PDK.logout();
    },
    /*
     *  Use DK to determine auth state of user
     *  @returns {Boolean}
     */
    loggedIn: function() {
        return !!PDK.getSession();
    },
    /*
     *  Use SDK to create a new Pin
     *  @param {Object}   data     - {board, note, link, image_url}
     *  @param {Function} callback - function fired on completion
     */
    createPin: function(data, callback) {
        PDK.request('/pins/', 'POST', data, callback);
    },
    /*
     *  Use SDK to request current users boards
     *  @param {Function} callback - function fired on completion
     */
    myBoards: function(callback) {
        PDK.me('boards', { fields: Const.PIN_FIELDS }, callback);
    },
    /*
     *  Use SDK to request current users boards
     *  @param {Function} callback - function fired on completion
     */
    getBoards: function(data, callback) {
        PDK.request('boards/'+data+'/pins/', 'GET', callback);
    }
};

// one time init of the application
PDK.init({ appId: Const.PIN_APP, cookie: true });

function   resetState() {
        var state = {            
            pinterest: Pinterest.loggedIn()
        };    
        return state;
    }

var resetState = resetState();

function  pinLogin() {
        Pinterest.login(resetState);
    };

pinLogin();

Pinterest.myBoards(response => {
           console.log(response.data);
});

var data = ["241013086247673676", "Hello, world!", "http://www.google.com", "http://i.imgur.com/a2tjOcm.png"];

var dataBoard = 'glamour';
Pinterest.getBoards(dataBoard , response => {
           console.log(response.data);
});
