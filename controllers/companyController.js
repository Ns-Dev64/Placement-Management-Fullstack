const async_handler = require("express-async-handler");
const Company=require("../models/companyModel")

const add_Company=async_handler(async(req,res)=>{
    const {Name,Domains,Company_Representative,Company_Representative_Mail,Company_Website,Job_Titles,Eligibility_Criteria,Drive_date}=req.body
    if(!Name||!Domains||!Eligibility_Criteria){
        res.status(400).json({message:"Please enter the required fields"})
    }
    const new_Company=new Company({
        Name:Name,
        Domains:Domains,
        Comp_Rep:Company_Representative,
        Comp_Rep_Mail:Company_Representative_Mail,
        Comp_Website:Company_Website,
        Job_Titles:Job_Titles,
        eligibilityCriteria:Eligibility_Criteria,
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
    const {_id}=req.body
    try{
        const upd_Company= await Company.findByIdAndUpdate(
            _id,
            req.body,
            {new:true}
        );
        res.status(200).json(upd_Company)
    }catch(err){
        res.status(400).json({message:err})
    }
})

const getCompany=async_handler(async(req,res)=>{
    const {comp_id}=req.body
    const get_comp=await Company.findById(comp_id)
    if (!comp_id) {
        res.status(400);
        throw new Error("Error occured whilst processing your request");
      }
    res.status(200).json(get_comp)
})

const delete_Company = async_handler(async (req, res) => {
    const {comp_id}=req.body
    const comp_del = await Company.findById(comp_id);
    if (!comp_del) {
      res.status(400);
      throw new Error("Error occured whilst processing your request");
    }
    await comp_del.deleteOne();
    res.status(200).json({ message: "success" });
  });

module.exports={add_Company,dislay_Companies,update_Company,delete_Company,getCompany}