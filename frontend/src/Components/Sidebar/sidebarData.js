
import CreateUser from "../../Pages/CreateUser/CreateAdmin";
import UpdateUser from "../../Pages/CreateUser/UpdateUser";
import Home from "../../Pages/Home/Home";
import UserManage from "../../Pages/MasterTable/ManageUser/ManageUser";
import AssemblyManagement from "../../Pages/MasterTable/ManageAssembly/AssemblyMange";
import ManageCity from "../../Pages/MasterTable/ManageCity/ManageCity";
import ParliamentManagement from "../../Pages/MasterTable/ManageParliament/ParliamentManagement";
import StateManagement from "../../Pages/MasterTable/ManageState/StateManagement";




     const sidebarData = {
        "Super Admin": [
          { label: "Dashboard", link: "/",component:Home,auth:{create:true,read:true,update:true,delete:true}},
          { label: "Create User", link: "/create-user",component:CreateUser,auth:{create:true,read:true,update:true,delete:true}},
          { label: "Manage City", link: "/manage-city",component:ManageCity ,auth:{create:true,read:true,update:true,delete:true}},
          { label: "Manage State", link: "/manage-state" ,component:StateManagement,auth:{create:true,read:true,update:true,delete:true}},
          { label: "Manage Assembly", link: "/manage-assembly" ,component:AssemblyManagement, auth:{create:true,read:true,update:true,delete:true}},
          { label: "Manage Parliament", link: "/manage-parliament" ,component:ParliamentManagement, auth:{create:true,read:true,update:true,delete:true}},
          { label: "Manage User", link: "/manage-user" ,component:UserManage, auth:{create:true,read:true,update:true,delete:true}},
          { label: "Update User", link: "/update-user" ,component:UpdateUser, auth:{create:true,read:true,update:true,delete:true}},

        ],
        "Parliament": [
          { label: "Dashboard", link: "/" ,component:Home, auth:{create:true,read:true,update:true,delete:true}},
          { label: "Create User", link: "/create-user" , component:CreateUser, auth:{create:true,read:true,update:true,delete:true}},

        ],
        "Assembly": [
          { label: "Dashboard", link: "/", component:Home,auth:{create:true,read:true,update:true,delete:true}},
          { label: "Create User", link: "/create-user" ,component:CreateUser,auth:{create:true,read:true,update:true,delete:true}},

        ],
        "Subadmin": [
          { label: "Dashboard", link: "/" , component:Home,auth:{create:true,read:true,update:true,delete:true}},
          { label: "Create User", link: "/create-user" , component:CreateUser,auth:{create:true,read:true,update:true,delete:true}},

        ],
        "Mandal Officer": [
          { label: "Dashboard", link: "/", component:Home,auth:{create:true,read:true,update:true,delete:true}},
        ],
        "IT Cell Officer": [
            { label: "Dashboard", link: "/" , component:Home,auth:{create:true,read:true,update:true,delete:true}},
        ],
        "Fake Voter Officer": [
            { label: "Dashboard", link: "/" , component:Home,auth:{create:true,read:true,update:true,delete:true}},
        ],
        "Outer Voter Officer": [
            { label: "Dashboard", link: "/" , component:Home,auth:{create:true,read:true,update:true,delete:true}},
        ],
        "BLA": [
            { label: "Dashboard", link: "/" , component:Home,auth:{create:true,read:true,update:true,delete:true}},
        ],
        "BLO": [
            { label: "Dashboard", link: "/" , component:Home,auth:{create:true,read:true,update:true,delete:true}},
        ],
        "Booth Officer": [
            { label: "Dashboard", link: "/" , component:Home,auth:{create:true,read:true,update:true,delete:true}},
        ],
      };
      

    

export default sidebarData;