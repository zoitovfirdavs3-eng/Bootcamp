function fetchData (){
    console.log("So'rov yuborildi");
    Promise.resolve({username: "Binali Binaliyev"})
    .then((res) => {
        if(res){
            const filter = processData(res);
            if(filter.data){
                const save = saveData(filter.data);
                console.log(save);
            }
        }
    })
};

function processData (data) {
    console.log("Ma'lumotlar filterlanmoqda:", data);
    return {
        message: "Ma'lumotlar filterlandi",
        data
    };
};

function saveData (data){
    console.log("Ma'lumotlar saqlanmoqda:", data);
    return {
        message: "Ma'lumotlar saqlandi",
        data
    };
};

fetchData();