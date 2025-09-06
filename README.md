# ✈️ AI Travel Planner
*App Working Link* : https://ai-travel-planner-xi-seven.vercel.app/

**AI Travel Planner** is an intelligent web application designed to simplify and enhance the travel planning experience 🌍. The app leverages AI-powered recommendations, custom itineraries, and real-time notifications to help users plan their perfect trips. Whether you’re a solo traveler, a couple, or a family, this tool will make your trip planning process seamless, organized, and fun 🎒.

---

## 🌟 Overview

**AI Travel Planner** is designed to help travelers plan their trips in a hassle-free and personalized manner 🧳. With its AI-powered destination recommendations and custom itinerary builder, users can input their preferences and instantly get a tailored travel plan. The app also enables users to manage their trips, save itineraries, and sign in securely via **Google OAuth** 🔐.

### Key Features:

* **AI-Powered Destination Suggestions** 🏝️: Get travel recommendations based on your preferences.
* **Custom Itinerary Creation** 🗺️: Create detailed itineraries with suggested activities, local attractions, and more.
* **My Trips** 📅: View and manage all your trips in one place.
* **Google OAuth Integration** 🔒: Sign in easily and securely using your Google account.
* **Responsive Design** 📱: Fully optimized for desktop, tablet, and mobile devices.
* **Real-Time Toast Notifications** 📣: Get instant feedback on actions with **Sonner** notifications.

---

### Key Features & How It Works

#### 1. **AI-Powered Destination Recommendations** 🌍

The core feature of the AI Travel Planner is its ability to recommend destinations based on your travel preferences. Whether you're looking for beach vacations, cultural experiences, or adventure trips, the app uses intelligent algorithms to suggest the best places that match your criteria. You can specify factors such as:

* Budget 💰
* Weather preferences 🌞🌧️
* Travel style (e.g., relaxation, adventure, exploration) 🏖️🧗
* Seasonality and travel dates 📅

#### 2. **Custom Itinerary Creation** 🗓️

Once you’ve selected your destination(s), the app generates a customized itinerary based on your trip details. It factors in the best activities, local attractions, and travel routes, creating an itinerary that aligns with your preferences. You can modify the itinerary as needed, adding or removing activities to fit your needs.

#### 3. **Real-Time Trip Management** 📍

After creating your trip, you can view and manage the details of your travel plans in one place. The **My Trips** page gives you an overview of all your trips and allows you to click into individual trips to see detailed information. You can track your itinerary, make changes, and check off activities as you go ✅.

#### 4. **Google OAuth Authentication** 🔑

Sign up and log in securely with **Google OAuth** integration. This allows you to access your trip data across devices and store your travel plans securely without the need to manage additional credentials. With a single click, you can save, modify, and access your trips from anywhere 🌐.

#### 5. **Mobile-Friendly Design** 📱

The application is fully responsive, ensuring that it works seamlessly across desktop, tablet, and mobile devices. Whether you're planning your trip on your laptop at home 💻 or modifying your itinerary while on the go 🏞️, the app adapts to your device's screen size for an optimal experience.

#### 6. **Toast Notifications for Real-Time Feedback** 📢

Instant feedback is crucial when interacting with the app. The app integrates **Sonner** for toast notifications to alert users of important actions, such as successfully creating a trip or an error in submitting a form ⚠️. These small but useful alerts improve the user experience and ensure you’re always in the know 📬.

---

### Why AI Travel Planner? 🤔

* **Efficient Travel Planning** ⏳: Traditional travel planning involves hours of research, back-and-forth between websites, and lots of time organizing itineraries. The AI Travel Planner automates much of this process, making it easier for travelers to get started with their plans.
* **Personalized Experience** 🎯: Instead of generic recommendations, the AI Travel Planner tailors each suggestion to your individual preferences, ensuring that your trip aligns with your desires and expectations.
* **Comprehensive Tool** 🛠️: From destination discovery to itinerary management, the app provides a one-stop solution for all your travel needs. No more switching between multiple apps or websites to plan a trip.

---

### 🚀 Future Features (Roadmap)

While the current version is already packed with powerful features, here’s a glimpse of what’s coming soon:

* **Integration with External APIs for Real-Time Data** 🔄: This could include flight booking systems ✈️, hotel reservations 🏨, and activity bookings 🏞️, allowing users to book everything directly through the app.
* **Collaborative Trip Planning** 👥: Allow groups of users to collaborate on trip planning. Share itineraries, suggest activities, and vote on destinations in real time.
* **Social Sharing** 📲: Share your trip itineraries directly on social media or with friends via email 📧.
* **Multi-Language Support** 🌏: Expanding the app’s reach globally by supporting different languages and currencies 💵.
* **Offline Mode** 🌍: Keep access to itineraries even when you’re offline while traveling abroad.

---

## 🎥 Demo

You can try out the AI Travel Planner by visiting the live demo:
[AI Travel Planner Demo](https://ai-travel-planner-git-main-rahuldev-01s-projects.vercel.app/)

---

## 🛠️ Installation

Follow the steps below to set up the project on your local machine.

### Prerequisites

* [Node.js](https://nodejs.org/) (v16 or higher)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/RahulDev-01/ai-travel-planner.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd ai-travel-planner
   ```

3. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

4. **Set up environment variables**:
   Create a `.env` file in the root directory of the project and add your **Google OAuth Client ID**:

   ```plaintext
   VITE_GOOGLE_AUTH_CLIENT_ID=your-google-client-id
   ```

5. **Start the development server**:

   ```bash
   npm start
   # or
   yarn start
   ```

6. **Open your browser** and go to [http://localhost:3000](http://localhost:3000) to view the app.

---

## ⚙️ Usage

After setting up the project locally, you can:

1. **Homepage**: The landing page will provide navigation options to create a trip ✈️, view existing trips 🗺️, or sign in 🔑.
2. **Create Trip**: Navigate to `/create-trip` to create a new trip by entering details like destination, dates 📅, and activities.
3. **View Trip**: View individual trips by navigating to `/view-trip/:tripId`, where `:tripId` is the unique ID of the trip.
4. **My Trips**: Access `/my-trips` to view and manage all of your saved trips 📚.
5. **Authentication**: Use Google OAuth to sign in and store your trips securely.

---

## 🧰 Technologies Used

* **Frontend**:

  * **React.js** for building the UI components 🖥️.
  * **React Router** for navigation 🚦.
  * **Sonner** for toast notifications 🔔.
  * **CSS** for styling and responsive design 🎨.

* **Backend**:

  * **Google OAuth** for user authentication 🔒.

* **Development Tools**:

  * **Vite** for bundling and fast development setup ⚡.

---

## 🤝 Contributing

We welcome contributions! If you would like to enhance the project or report bugs, follow these steps:

1. **Fork the repository** 🍴 to your own GitHub account.
2. **Create a new branch** for your feature or fix:

   ```bash
   git checkout -b feature-xyz
   ```
3. **Make your changes** and commit them:

   ```bash
   git commit -am 'Add feature xyz'
   ```
4. **Push your changes**:

   ```bash
   git push origin feature-xyz
   ```
5. **Open a pull request** on GitHub to merge your changes.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

* **React**: Thanks to the React community for making the development process smoother and more efficient.
* **React Router**: For providing a powerful routing
