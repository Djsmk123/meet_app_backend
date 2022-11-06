import { usersdataCollection,eventdataCollections } from "../firebase_config/firebase_config.js";
import { compareTwoStrings } from "string-similarity";
export async function getRecommandation(req,res){
    const uid=req.body.uid;
    const eventId=req.body.eventId;
    const usersData=await usersdataCollection.doc(uid).get()
    const userSkills=refactorSkills(usersData.get('jobTitle'),usersData.get('skills'))
    const eventDoc=await eventdataCollections.doc(eventId).get()
    const participantIds=eventDoc.get('participants')
    const matches=[]
    for (const i of participantIds)
    {
        if(i['isGoing'] && i['user_id']!=uid)
        {
           const participantId=i['user_id']
           const participantDoc=await usersdataCollection.doc(participantId).get()
           
           const participantSkills=refactorSkills(participantDoc.get('jobTitle'),participantDoc.get('skills'))
           console.log(participantSkills+' ::: '+userSkills)
           const per=compareTwoStrings(participantSkills,userSkills);
           if(per>0.4)
           matches.push(participantId)
        }

    }

    res.send(JSON.stringify({"d":matches}))
}

function refactorSkills(jobTitle,skills){
    let combineString=''
    if(jobTitle!=null)
    combineString+=jobTitle
    if(skills!=null && skills.length!=0)
    combineString+=skills.toString()

    return combineString

}
