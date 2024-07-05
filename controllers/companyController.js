const async_handler = require("express-async-handler");
const Company=require("../models/companyModel")

const add_Company=async_handler(async(req,res)=>{
    const {Name,Domains,Comp_Rep,Comp_Rep_Mail,Comp_Website,Job_Titles,eligibilityCriteria,Drive_date}=req.body
    if(!Name||!Domains||!eligibilityCriteria){
        res.status(400).json({message:"Please enter the required fields"})
    }
    const new_Company=new Company({
        Name:Name,
        Domains:Domains,
        Comp_Rep:Comp_Rep,
        Comp_Rep_Mail:Comp_Rep_Mail,
        Comp_Website:Comp_Website,
        Job_Titles:Job_Titles,
        eligibilityCriteria:eligibilityCriteria,
        Drive_date:Drive_date
    })
    await new_Company.save()
    res.status(200).json({message:"Company registered"})
})

const dislay_Companies=async_handler((async(req,res)=>{
    const compaines=await Company.find()
    if(!compaines){
        res.status(400).json({message:"Error Finding Data / No companies registered"})
    }
    res.status(200).json(compaines)
}))

const update_Company=async_handler(async(req,res)=>{
    const {Company_id}=req.body
    try{
        const upd_Company= await Company.findByIdAndUpdate(
            Company_id,
            req.body,
            {new:true}
        );
        res.status(200).json(upd_Company)
    }catch(err){
        res.status(400).json({message:err})
    }
})

const delete_Company = async_handler(async (req, res) => {
    const {Company_id}=req.body
    const comp_del = await Company.findById(Company_id);
    if (!comp_del) {
      res.status(400);
      throw new Error("Error occured whilst processing your request");
    }
    await comp_del.deleteOne();
    res.status(200).json({ message: "success" });
  });

module.exports={add_Company,dislay_Companies,update_Company,delete_Company}