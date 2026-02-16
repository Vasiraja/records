// import {authenticate} from '@feathersjs/authentication';
import type { HookContext } from '@feathersjs/feathers';



// function removePassword(context:HookContext){
//     if(context.result){
//         if(Array.isArray(context.result)){
//             context.result=context.result.map(user=>{
//                 delete user.password
//                 return user
//             })
//         }
//     }
//     else{
//         delete context.result.password
//     }
// }

// export default {
//     before:{
//         find:[authenticate('jwt')],
//         get:[authenticate('jwt')],
//         update:[authenticate('jwt')],
//         patch:[authenticate('jwt')],
//         remove:[authenticate('jwt')],
//         create:[],
//     },
//     after:{
//         all:[
//             removePassword
//          ]
//     },
//     error:{}
// }


// export const admincheckHook = (context:HookContext) =>{
//     const user = context.params.user;
//     if(!user) return context

//     if(user.email === process.env.admin_email){
//         console.log("Admin Logged in...")
//         context.params.isAdmin=true;
//     }
//     return context
// }
