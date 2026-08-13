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
import { Users } from "./pages/Users";
import { AddUser } from "./pages/AddUser";
import { EditUser } from "./pages/EditUser";
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
import { MentorRegister } from "./pages/MentorRegister";
import { MentorServices } from "./pages/MentorServices";
import { CreateMentorsService } from "./pages/CreateMentorsService";
import { EditMentorService } from "./pages/EditMentorService";
import { MentorUsers } from "./pages/MentorUsers";
import { MentorChatWindow } from "./pages/MentorChatWindow";
import { LoginUser } from "./pages/LoginUser";
import { UserFlowDashboard } from "./pages/UserFlowDashboard";
import { UserFlowQuests } from "./pages/UserFlowQuests";
import { UserFlowMentors } from "./pages/UserFlowMentors";
import { UserFlowChat } from "./pages/UserFlowChat";
import { UserFlowServices } from "./pages/UserFlowServices";
import { MentorProfile } from "./pages/MentorProfile";
import { UserFlowBook } from "./pages/UserFlowBook";
import { UserProfile } from "./pages/UserProfile";
import { SurveySearchMentor } from "./pages/SurveySearchMentor";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Public & General Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/users" element={<Users />} />
      <Route path="/mentors" element={<Mentors />} />
      <Route path="/mentors/:mentorId" element={<SingleMentor />} />
      <Route path="/chats" element={<ChatsInbox />} />
      <Route path="/chats/:chatId" element={<ChatWindow />} />
      <Route path="/create-chat" element={<CreateChat />} />
      <Route path="/quests" element={<Quests />} />
      <Route path="/quest-trackings" element={<QuestTracking />} />
      <Route path="/services" element={<Services />} />

      {/* Admin Management Routes */}
      <Route path="/new_mentor" element={<NewMentor />} />
      <Route path="/edit_mentor/:mentorId" element={<EditMentor /> } />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<PrivateRoute tokenName="adminToken" redirectTo="/admin-login"><AdminDashboard /></PrivateRoute>} />
      
      {/* Admin CRUD / Management for Quests, Trackings, Users, Habits, Services */}
      <Route path="/quests/new" element={<PrivateRoute tokenName="adminToken" redirectTo="/admin-login"><CreateQuest /></PrivateRoute>} />
      <Route path="/quests/edit/:quest_id" element={<PrivateRoute tokenName="adminToken" redirectTo="/admin-login"><EditQuest /></PrivateRoute>} />
      <Route path="/quest-trackings/new" element={<PrivateRoute tokenName="adminToken" redirectTo="/admin-login"><CreateQuestTracking /></PrivateRoute>} />
      <Route path="/quest-trackings/:tracking_id/edit" element={<PrivateRoute tokenName="adminToken" redirectTo="/admin-login"><EditQuestTracking /></PrivateRoute>} />
      <Route path="/add-user" element={<PrivateRoute tokenName="adminToken" redirectTo="/admin-login"><AddUser /></PrivateRoute>} />
      <Route path="/edit-user/:id" element={<PrivateRoute tokenName="adminToken" redirectTo="/admin-login"><EditUser /></PrivateRoute>} />
      <Route path="/habits/new" element={<PrivateRoute tokenName="adminToken" redirectTo="/admin-login"><CreateHabit /></PrivateRoute>} />
      <Route path="/habits/edit/:habit_id" element={<PrivateRoute tokenName="adminToken" redirectTo="/admin-login"><EditHabit /></PrivateRoute>} />
      <Route path="/services/new" element={<PrivateRoute tokenName="adminToken" redirectTo="/admin-login"><CreateService /></PrivateRoute>} />
      <Route path="/services/edit/:service_id" element={<PrivateRoute tokenName="adminToken" redirectTo="/admin-login"><EditService /></PrivateRoute>} />
      <Route path="/administrators" element={<PrivateRoute tokenName="adminToken" redirectTo="/admin-login"><Administrators /></PrivateRoute>} />
      <Route path="/administrators/new" element={<PrivateRoute tokenName="adminToken" redirectTo="/admin-login"><CreateAdministrator /></PrivateRoute>} />
      <Route path="/administrators/:admin_id/edit" element={<PrivateRoute tokenName="adminToken" redirectTo="/admin-login"><EditAdministrator /></PrivateRoute>} />

      {/* Mentor Routes */}
      <Route path="/mentors/login" element={<MentorLogIn />} />
      <Route path="/mentors/register" element={<MentorRegister />} />
      <Route path="/mentors/dashboard/:mentor_id" element={<PrivateRoute tokenName="mentor_token" redirectTo="/mentors/login"><MentorPrivateDashboard /></PrivateRoute>} />
      <Route path="/mentors/services" element={<PrivateRoute tokenName="mentor_token" redirectTo="/mentors/login"><MentorServices /></PrivateRoute>} />
      <Route path="/mentors/services/new" element={<PrivateRoute tokenName="mentor_token" redirectTo="/mentors/login"><CreateMentorsService /></PrivateRoute>} />
      <Route path="/mentors/services/edit/:service_id" element={<PrivateRoute tokenName="mentor_token" redirectTo="/mentors/login"><EditMentorService /></PrivateRoute>} />
      <Route path="/mentors/users" element={<PrivateRoute tokenName="mentor_token" redirectTo="/mentors/login"><MentorUsers /></PrivateRoute>} />
      <Route path="/mentors/chats/:chatId" element={<PrivateRoute tokenName="mentor_token" redirectTo="/mentors/login"><MentorChatWindow /></PrivateRoute>} />
      <Route path="/mentor/profile" element={<PrivateRoute tokenName="mentor_token" redirectTo="/mentors/login"><MentorProfile /></PrivateRoute>} />


      {/* User Flow Routes */}
      <Route path="/user-register" element={<UserFlowRegister />} />
      <Route path="/login-user" element={<LoginUser />} />
      <Route path="/survey-search-mentor" element={<SurveySearchMentor />} />
      <Route path="/habits/user/:user_id" element={<PrivateRoute tokenName="user_token" redirectTo="/login-user"><UserFlowHabits /></PrivateRoute>} />
      <Route path="/user-dashboard/:user_id" element={<PrivateRoute tokenName="user_token" redirectTo="/login-user"><UserFlowDashboard /></PrivateRoute>} />
      <Route path="/user-quests" element={<PrivateRoute tokenName="user_token" redirectTo="/login-user"><UserFlowQuests /></PrivateRoute>} />
      <Route path="/user-mentors" element={<PrivateRoute tokenName="user_token" redirectTo="/login-user"><UserFlowMentors /></PrivateRoute>} />
      <Route path="/user-chat/:mentorId" element={<PrivateRoute tokenName="user_token" redirectTo="/login-user"><UserFlowChat /></PrivateRoute>} />
      <Route path="/user-services" element={<PrivateRoute tokenName="user_token" redirectTo="/login-user"><UserFlowServices /></PrivateRoute>} />
      <Route path="/user-book/:serviceId" element={<PrivateRoute tokenName="user_token" redirectTo="/login-user"><UserFlowBook /></PrivateRoute>} />
      <Route path="/user/profile" element={<PrivateRoute tokenName="user_token" redirectTo="/login-user"><UserProfile /></PrivateRoute>} />

    </Route>
  )
);