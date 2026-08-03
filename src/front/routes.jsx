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
import { Habits } from "./pages/Habits";
import { CreateHabit } from "./pages/CreateHabit";
import { EditHabit } from "./pages/EditHabit";
import { Administrators } from "./pages/Administrators";
import { CreateAdministrator } from "./pages/CreateAdministrator";
import { EditAdministrator } from "./pages/EditAdministrator";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";
import { PrivateRoute } from "./components/PrivateRoute";
import { LoginUser } from "./pages/LoginUser";
import { DashboardShelter } from "./pages/DashboardShelter";

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
      <Route path="/quests/new" element={<CreateQuest />} />
      <Route path="/quests/edit/:quest_id" element={<EditQuest />} />
      <Route path="/quest-trackings" element={<QuestTracking />} />
      <Route path="/quest-trackings/new" element={<CreateQuestTracking />} />
      <Route path="/quest-trackings/:tracking_id/edit" element={<EditQuestTracking />} />
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/edit-user/:id" element={<EditUser />} />
      <Route path="/habits" element={<Habits />} />
      <Route path="/habits/new" element={<CreateHabit />} />
      <Route path="/habits/edit/:habit_id" element={<EditHabit />} />
      <Route path="/administrators" element={<Administrators />} />
      <Route path="/administrators/new" element={<CreateAdministrator />} />
      <Route path="/administrators/:admin_id/edit" element={<EditAdministrator />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<PrivateRoute tokenName="adminToken" redirectTo="/admin-login"> <AdminDashboard /> </PrivateRoute>} />
      <Route path="/login-user" element={<LoginUser />} />
      <Route path="/dashboard-shelter" element={<PrivateRoute tokenName="shelterToken" redirectTo="/login-user"> <DashboardShelter /> </PrivateRoute>} />
    </Route>
  )
)