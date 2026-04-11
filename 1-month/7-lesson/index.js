var arr = ['Firdavsbek', 'Bahriddin', 'Imomali', 'Asrorbek', 'MuhammadSolih'];

var result = [];
for(var i = arr.length-1; i>=0; i--){
    var username = arr[i];
    var reverseUsername = '';
    for(var si = username.length-1; si>=0; si--){
        reverseUsername += username[si];
    }
    result.push(reverseUsername);
}
console.log(result)