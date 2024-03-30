# Chance documentation ❇️

## Deploy documentation 📄

> [!NOTE]
> If you need **test account**, please visit the chance deployment documentation: [Deploy Documentation](https://github.com/unknownbulgarian/chance#readme)

## Welcome to Chance 👋

Chance is like a **social media** playground where you can easily share your art with others and connect with fellow creators.

Chance is the ultimate social media hub, boasting all the essentials for seamless interaction: **user profiles**, **messaging**,**notifications**, a **powerful 
search engine**, and an **explore page**, ensuring you never miss out on discovering new art and connecting with like-minded creators.

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

<img src="https://i.ibb.co/ZxnCy7t/Screenshot-2024-03-30-163227.png" width="500">

### Posts Component 🔓

Not **authenticated** users are able to view the [posts](https://chance-now.vercel.app/discover) of other users.

<img src="https://i.ibb.co/d4mJ4gs/Screenshot-2024-03-30-205506.png" width="500">

### Discover Component 🔓

On this page, you can explore **posts** and [discover](https://chance-now.vercel.app/discover) **other users**.

<img src="https://i.ibb.co/nzpbzBy/Screenshot-2024-03-30-163657.png" width="500">

### Chat Component 🗝️

> [!IMPORTANT]
> Authentication is required.

You have the ability to chat with **every user** on the platform.

<img src="https://i.ibb.co/Mf8ZfgW/Screenshot-2024-03-30-164011.png" width="500">

### Dashboard Component 🗝️

> [!IMPORTANT]
> Authentication is required.

You can view your **lifetime statistics** on the platform.

<img src="https://i.ibb.co/xM4rSKb/Screenshot-2024-03-30-164145.png" width="500">

### Upload Component 🗝️

> [!IMPORTANT]
> Authentication is required.

You have the capability to **upload and share posts**, contributing to the vibrant community on the platform.

<img src="https://i.ibb.co/zVpRWsD/Screenshot-2024-03-30-164347.png" width="500">

### Support Component 🔓

In the [support page](https://chance-now.vercel.app/support), you have the option to **ask questions** and seek **assistance** whenever needed.

# More information coming soon 🔧





