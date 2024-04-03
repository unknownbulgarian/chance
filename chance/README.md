# Chance documentation ❇️

## Deploy documentation 📄

> [!NOTE]
> If you need **test account**, please visit the chance deployment documentation: [Deploy Documentation](https://github.com/unknownbulgarian/chance#readme)

## Welcome to Chance 👋

Chance is like a **social media** playground where you can easily share your art with others and connect with fellow creators.

Chance is the ultimate social media hub, boasting all the essentials for seamless interaction: **user profiles**, **messaging**,**notifications**, a **powerful 
search engine**, and an **explore page**, ensuring you never miss out on discovering new art and connecting with like-minded creators.

## Features ⭐

### Main

✅ You can **like posts**

✅ You can add post to **favorites**

✅ You can **post comments**

✅ You can **like comments**

✅ You can **delete your own comment**

✅ If you have **owner access** to post, you can **delete every comment**

✅ You can **delete your posts**

✅ You can **follow other users**

✅ You can **upload posts**

✅ You can **download posts** 

 ### Notifications
 
> [!NOTE]
> If you have already seen the notification, it will not appear in recent activity, you should look in the other categories.

✅ Recent activity

✅ Downloads

✅ Likes

✅ Favorites

✅ Followers

✅ Chat

✅ Comments

✅ History     

### Profile

> [!IMPORTANT]
> You can change your username every 15 days.

✅ Change your profile photo

✅ Change your username

✅ Change your name

✅ Change your bio

### Dashboard

✅ You can see your lifetime posts

✅ You can see your lifetime likes

✅ You can see your lifetime comments

✅ You can see your lifetime downloads

✅ You can see your lifetime favorites

✅ You can see your lifetime views

### Chat

> [!NOTE]
> In the messages section are the people who you already have chatted with them and you follow them.
> Requests are the people who chat with you and you don't follow them.

✅ You can chat with anyone

✅ You can delete your own messages 

### Support Chat

✅ You can ask questions and receive answers from our team

### Settings

✅ You can switch to dark theme

✅ You can turn off the notifications

✅ You can change your password

### Support
✅ You can use the search system to find questions in the documentation

## Algorithm

### Discover Page

Every time you go to the discover page and click on the 'all' category, it will retrieve all posts and **randomize** them, allowing you to find and **explore more**.

The same goes for the **accounts page discover**.

<img src="https://i.ibb.co/8gNbGdr/Screenshot-2024-03-30-210108.png" width="500">

<img src="https://i.ibb.co/JQCfspT/Screenshot-2024-03-30-210201.png" width="500">

### Related Posts

Related posts are based on the **caption** and **category**. So, every time you click on a single post, below it will show the 20 **closest** posts based on the **caption** and **category**.

<img src="https://i.ibb.co/9ZX8xpq/Screenshot-2024-04-03-151217.png" width="500">

## Search Engine

> [!IMPORTANT]
> When you hit enter, you will search for posts by default.

When you start searching for something first it will show the **closest 8 results**.

You can search for both **accounts** and **posts**.

<img src="https://i.ibb.co/JKY2yjS/Screenshot-2024-04-03-151115.png" width="500">



## Routes 📂

```
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account', component: AccountComponent, 🔒canActivate: [CreateAccountGuard] },
  { path: 'profile', component: ProfileComponent, 🔒canActivate: [AuthCheckerGuard] },
  { path: 'profiles/:name', component: ProfilesComponent },
  { path: 'posts/:id', component: PostsComponent },
  { path: 'discover', component: DiscoverComponent},
  { path: 'chat', component: ChatComponent, 🔒canActivate: [AuthCheckerGuard] },
  { path: 'dashboard', component: DashboardComponent, 🔒canActivate: [AuthCheckerGuard] },
  { path: 'upload', component: UploadComponent, 🔒canActivate: [AuthCheckerGuard] },
  { path: 'support', component: SupportComponent}
];
```

> There are a total of 5 pages that do not require authentication.

> There are a total of 5 pages that require authentication.

### Home Component 🔓

The [home component](https://chance-now.vercel.app/) serves as the **default page** upon entering the website, where users can readily find **comprehensive information** about the project.

<img src="https://i.ibb.co/3M1ktSZ/Screenshot-2024-03-30-162217.png" width="500">

### Account Component 🗝️

> [!IMPORTANT]
> If you are authenticated, you will not have access to this page.

You have the ability to [create your account](https://chance-now.vercel.app/account), establishing your presence on the platform.

<img src="https://i.ibb.co/v3gJvFm/Screenshot-2024-03-30-162745.png" width="500">

### Profile Component 🗝️

> [!IMPORTANT]
> Authentication is required.

You have access to edit various aspects of your profile such as your **profile photo**, **username**, and **bio**.

<img src="https://i.ibb.co/NZnn9Sv/Screenshot-2024-03-30-163042.png" width="500">

### Profiles Component 🔓

Not **authenticated** users are able to view the [profiles](https://chance-now.vercel.app/profiles/Testov) of other users.

<img src="https://i.ibb.co/h1m66wR/Screenshot-2024-03-30-210508.png" width="500">

### Posts Component 🔓

Not **authenticated** users are able to view the [posts](https://chance-now.vercel.app/discover) of other users.

<img src="https://i.ibb.co/d4mJ4gs/Screenshot-2024-03-30-205506.png" width="500">

### Discover Component 🔓

On this page, you can explore **posts** and [discover](https://chance-now.vercel.app/discover) **other users**.

<img src="https://i.ibb.co/8gNbGdr/Screenshot-2024-03-30-210108.png" width="500">

<img src="https://i.ibb.co/JQCfspT/Screenshot-2024-03-30-210201.png" width="500">

### Chat Component 🗝️

> [!IMPORTANT]
> Authentication is required.

You have the ability to chat with **every user** on the platform.

<img src="https://i.ibb.co/Mf8ZfgW/Screenshot-2024-03-30-164011.png" width="500">

### Dashboard Component 🗝️

> [!IMPORTANT]
> Authentication is required.

You can view your **lifetime statistics** on the platform.

<img src="https://i.ibb.co/g79XrX3/Screenshot-2024-03-30-205719.png" width="500">

### Upload Component 🗝️

> [!IMPORTANT]
> Authentication is required.

You have the capability to **upload and share posts**, contributing to the vibrant community on the platform.

<img src="https://i.ibb.co/CncWWbY/Screenshot-2024-03-30-210020.png" width="500">

### Support Component 🔓

In the [support page](https://chance-now.vercel.app/support), you have the option to **ask questions** and seek **assistance** whenever needed.

# More information coming soon 🔧





