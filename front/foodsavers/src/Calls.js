import axios from 'axios'

async function get(url, id=null){
    try{
        let newUrl = !id ? url : url + "/"+id;
        return (await axios.get(newUrl)).data;
    }catch(e){
        return e.response.data;
    }
}

async function getAll(url){
    try{
        return (await axios.get(url)).data;
    }catch(e){
        return e.response.data;
    }
}


async function getByEmail(url, email=null){
    try{
        let newUrl = !email ? url : url + "/email/"+email;
        return (await axios.get(newUrl)).data;
    }catch(e){
        return e.response.data;
    }
}

async function getUserByEmail(url, email=null){
    try{
        let newUrl = !email ? url : url + "/emailFull/"+email;
        return (await axios.get(newUrl)).data;
    }catch(e){
        return e.response.data;
    }
}

async function post(url, item) {
    try {
        return (await axios.post(
            url,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (e) {
        return e.response.data;
    }
}


export {get,getByEmail,post,getAll,getUserByEmail};