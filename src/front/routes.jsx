// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Mentors } from "./pages/Mentors";
import { SingleMentor } from "./pages/SingleMentor";
import { NewMentor } from "./pages/NewMentor";
import { EditMentor } from "./pages/EditMentor";
import { ChatsInbox } from "./pages/ChatsInbox";
import { ChatWindow } from "./pages/ChatWindow";
import { CreateChat } from "./pages/CreateChat";
import { Quests } from "./pages/Quests";
import { CreateQuest } from "./pages/CreateQuest";
import { EditQuest } from "./pages/EditQuest";
import { CreateQuestTracking } from "./pages/CreateQuestTracking";
import { EditQuestTracking } from "./pages/EditQuestTracking";
import { QuestTracking } from "./pages/QuestTracking";
import { Users } from "./pages/Users"
import { AddUser } from "./pages/AddUser"
import { EditUser } from "./pages/EditUser"
import { UserFlowHabits } from "./pages/UserFlowHabits";
import { CreateHabit } from "./pages/CreateHabit";
import { EditHabit } from "./pages/EditHabit";
import { MentorLogIn } from "./pages/MentorLogIn";
import { MentorPrivateDashboard } from "./pages/MentorPrivateDashboard";
import { Services } from "./pages/Services";
import { EditService } from "./pages/EditService";
import { CreateService } from "./pages/CreateService";
import { Administrators } from "./pages/Administrators";
import { CreateAdministrator } from "./pages/CreateAdministrator";
import { EditAdministrator } from "./pages/EditAdministrator";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";
import { PrivateRoute } from "./components/PrivateRoute";
import { UserFlowRegister } from "./pages/UserFlowRegister";
import { LoginUser } from "./pages/LoginUser";
import { UserFlowDashboard } from "./pages/UserFlowDashboard";
import { UserFlowQuests } from "./pages/UserFlowQuests";
import { UserFlowMentors } from "./pages/UserFlowMentors";
import { UserFlowChat } from "./pages/UserFlowChat";
import { UserFlowServices } from "./pages/UserFlowServices";

export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />  {/* Dynamic route for single items */}
      <Route path="/demo" element={<Demo />} />
      <Route path="/users" element={<Users />} />
      <Route path="/mentors" element={<Mentors />} />
      <Route path="/mentors/:mentorId" element={<SingleMentor />} />
      <Route path="/new_mentor" element={<NewMentor />} />
      <Route path="/edit_mentor/:mentorId" element={<EditMentor />} />
      <Route path="/chats" element={<ChatsInbox />} />
      <Route path="/chats/:chatId" element={<ChatWindow />} />
      <Route path="/create-chat" element={<CreateChat />} />
      <Route path="/quests" element={<Quests />} />
      <Route path="/quests/new" element={<PrivateRoute tokenName="user_token" redirectTo="/login-user"> <CreateQuest /> </PrivateRoute>} />
      <Route path="/quests/edit/:quest_id" element={<PrivateRoute tokenName="user_token" redirectTo="/login-user"> <EditQuest /> </PrivateRoute>} />
      <Route path="/quest-trackings" element={<QuestTracking />} />
      <Route path="/quest-trackings/new" element={<CreateQuestTracking />} />
      <Route path="/quest-trackings/:tracking_id/edit" element={<EditQuestTracking />} />
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/edit-user/:id" element={<EditUser />} />
      <Route path="/habits/user/:user_id" element={<PrivateRoute tokenName="user_token" redirectTo="/login-user"> <UserFlowHabits /> </PrivateRoute>} />
      <Route path="/habits/new" element={<PrivateRoute tokenName="user_token" redirectTo="/login-user"> <CreateHabit /> </PrivateRoute>} />
      <Route path="/habits/edit/:habit_id" element={<PrivateRoute tokenName="user_token" redirectTo="/login-user"> <EditHabit /> </PrivateRoute>} />
      <Route path="/mentors/login" element={<MentorLogIn />} />
      <Route path="/mentors/dashboard/:mentor_id" element={<MentorPrivateDashboard />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/edit/:service_id" element={<EditService />} />
      <Route path="/services/new" element={<CreateService />} />
      <Route path="/administrators" element={<Administrators />} />
      <Route path="/administrators/new" element={<CreateAdministrator />} />
      <Route path="/administrators/:admin_id/edit" element={<EditAdministrator />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<PrivateRoute tokenName="adminToken" redirectTo="/admin-login"> <AdminDashboard /> </PrivateRoute>} />
      <Route path="/user-register" element={<UserFlowRegister />} />
      <Route path="/login-user" element={<LoginUser />} />
      <Route path="/user-dashboard" element={<PrivateRoute tokenName="user_token" redirectTo="/login-user"> <UserFlowDashboard /> </PrivateRoute>} />
      <Route path="/user-quests" element={<PrivateRoute tokenName="user_token" redirectTo="/login-user"> <UserFlowQuests /> </PrivateRoute>} />
      <Route path="/user-mentors" element={<PrivateRoute tokenName="user_token" redirectTo="/login-user"> <UserFlowMentors /> </PrivateRoute>} />
      <Route path="/user-chat/:mentorId" element={<PrivateRoute tokenName="user_token" redirectTo="/login-user"> <UserFlowChat /> </PrivateRoute>} />
      <Route path="/user-services" element={<PrivateRoute tokenName="user_token" redirectTo="/login-user"> <UserFlowServices /> </PrivateRoute>} />
    </Route>
  )
)