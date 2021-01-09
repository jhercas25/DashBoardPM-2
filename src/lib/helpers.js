

const bcrypt=require('bcryptjs');
const helpers ={}

helpers.encryP = async (password)=>{
    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(password,salt);
    return hash;
}

helpers.matchPassword= async(password,savepassword)=>{
    
    try{
        return await bcrypt.compare(password,savepassword);
        
    } catch(err){

        console.log(err);
    }
};

module.exports= helpers;