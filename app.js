// Global variables
let currentUser = null;
let isSignUpMode = false;
let selectedImageFile = null;
let selectedProfilePicFile = null;

// DOM elements
const authBtn = document.getElementById('authBtn');
const authText = document.getElementById('authText');
const authModal = document.getElementById('authModal');
const closeModal = document.getElementById('closeModal');
const authForm = document.getElementById('authForm');
const modalTitle = document.getElementById('modalTitle');
const authSubmitBtn = document.getElementById('authSubmitBtn');
const authSwitchBtn = document.getElementById('authSwitchBtn');
const authSwitchText = document.getElementById('authSwitchText');
const nameGroup = document.getElementById('nameGroup');
const bioGroup = document.getElementById('bioGroup');
const profilePicGroup = document.getElementById('profilePicGroup');
const postContent = document.getElementById('postContent');
const createPostBtn = document.getElementById('createPostBtn');
const postsFeed = document.getElementById('postsFeed');
const loadingSpinner = document.getElementById('loadingSpinner');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

// Image upload elements
const postImage = document.getElementById('postImage');
const addImageBtn = document.getElementById('addImageBtn');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');
const removeImageBtn = document.getElementById('removeImageBtn');

// Profile picture elements
const profilePic = document.getElementById('profilePic');
const profilePicPreview = document.getElementById('profilePicPreview');
const profilePreviewImg = document.getElementById('profilePreviewImg');
const removeProfilePicBtn = document.getElementById('removeProfilePicBtn');
const editProfilePicBtn = document.getElementById('editProfilePicBtn');
const profileAvatar = document.getElementById('profileAvatar');

// Connections elements
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Random post generation data
const randomPostCategories = [
    {
        category: 'Tech',
        templates: [
            "Just deployed our new AI-powered feature! 🚀 The team worked tirelessly for months and the results are incredible. Users are already loving the improved experience. #TechLife #AI #Innovation",
            "Excited to announce that I've joined a new company as a Senior Engineer! Looking forward to building amazing products with this talented team. #NewJob #CareerGrowth",
            "Just completed my AWS certification! 📚 Learning never stops in tech. Next goal: Google Cloud certification. #ContinuousLearning #TechSkills",
            "Our startup just hit 10,000 users! 🎉 From idea to success in just 6 months. Grateful for the amazing team and mentors. #StartupLife #Entrepreneurship"
        ]
    },
    {
        category: 'Fitness',
        templates: [
            "Just completed my first marathon! 💪 26.2 miles conquered and feeling amazing. Consistency is key! #FitnessGoals #HealthyLifestyle",
            "Hit a new personal record today! 🏋️ Deadlift: 200kg. Progress takes time but it's worth it. #StrengthTraining #FitnessJourney",
            "Completed my 10K run in 45 minutes! 🏃‍♀️ Training for Boston Marathon and feeling stronger every day. #Running #MarathonTraining",
            "Started my 12-week transformation program today! Day 1 complete. Ready to transform my fitness. #WorkoutPlan #FitnessMotivation"
        ]
    },
    {
        category: 'Education',
        templates: [
            "Just graduated with my Master's degree! 🎓 2 years of hard work finally paid off. #Graduation #Education #Success",
            "Excited to announce that I've been accepted into the PhD program! 📚 Ready for this next chapter. #HigherEducation #AcademicLife",
            "Just published my first research paper! 📖 Months of research finally seeing the light. The academic community's response has been overwhelming. #Research #AcademicAchievement",
            "Completed my Project Management certification course! 🎯 Leadership skills acquired. Never stop learning! #ProfessionalDevelopment #Skills"
        ]
    },
    {
        category: 'Travel',
        templates: [
            "Just landed in Tokyo! 🌍 Culture shock is real and can't wait to explore. #Travel #Adventure #Wanderlust",
            "Exploring the beautiful streets of Paris today! 📸 The architecture is absolutely breathtaking. #TravelPhotography #Adventure",
            "Completed my Southeast Asia journey! 🎒 3 months of amazing experiences and unforgettable memories. #TravelLife #Backpacking",
            "Just booked my next adventure! ✈️ So excited about this upcoming trip. #TravelPlanning #BucketList"
        ]
    }
];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('App initializing...');
    initializeApp();
    setupEventListeners();
    
    // Clear any stale authentication state on page load
    clearCachedData();
    
    // Check authentication state
    checkAuthState();
    generateSampleData();
    startRandomPostGenerator();
});

// Initialize the application
function initializeApp() {
    // Set up character counter for post textarea
    setupCharacterCounter();
    
    // Set up image upload functionality
    setupImageUpload();
    
    // Set up profile picture upload functionality
    setupProfilePicUpload();
    
    // Set up connections tabs
    setupConnectionsTabs();
    
    // Don't load posts initially - wait for authentication state
}

// Set up event listeners
function setupEventListeners() {
    // Auth modal
    authBtn.addEventListener('click', openAuthModal);
    closeModal.addEventListener('click', closeAuthModal);
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) closeAuthModal();
    });

    // Auth form
    authForm.addEventListener('submit', handleAuthSubmit);
    authSwitchBtn.addEventListener('click', toggleAuthMode);

    // Post creation
    createPostBtn.addEventListener('click', createPost);

    // Profile picture edit
    if (editProfilePicBtn) {
        editProfilePicBtn.addEventListener('click', () => {
            if (profilePic) {
                profilePic.click();
            }
        });
    }

    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            if (page) {
                navigateToPage(page);
            }
        });
    });
}

// Set up profile picture upload functionality
function setupProfilePicUpload() {
    console.log('Setting up profile picture upload...');
    console.log('profilePic element:', profilePic);
    console.log('profilePreviewImg element:', profilePreviewImg);
    console.log('profilePicPreview element:', profilePicPreview);
    console.log('removeProfilePicBtn element:', removeProfilePicBtn);
    
    if (profilePic) {
        profilePic.addEventListener('change', (e) => {
            console.log('Profile picture file selected:', e.target.files[0]);
            const file = e.target.files[0];
            if (file) {
                selectedProfilePicFile = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    console.log('Profile picture loaded for preview');
                    if (profilePreviewImg) {
                        profilePreviewImg.src = e.target.result;
                        if (profilePicPreview) {
                            profilePicPreview.style.display = 'block';
                        }
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    } else {
        console.error('Profile picture input element not found!');
    }

    if (removeProfilePicBtn) {
        removeProfilePicBtn.addEventListener('click', () => {
            console.log('Removing profile picture');
            selectedProfilePicFile = null;
            if (profilePic) profilePic.value = '';
            if (profilePicPreview) profilePicPreview.style.display = 'none';
        });
    } else {
        console.error('Remove profile picture button not found!');
    }
}

// Set up image upload functionality
function setupImageUpload() {
    addImageBtn.addEventListener('click', () => {
        postImage.click();
    });

    postImage.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            selectedImageFile = file;
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImg.src = e.target.result;
                imagePreview.style.display = 'block';
                addImageBtn.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });

    removeImageBtn.addEventListener('click', () => {
        selectedImageFile = null;
        postImage.value = '';
        imagePreview.style.display = 'none';
        addImageBtn.style.display = 'inline-flex';
    });
}

// Set up connections tabs
function setupConnectionsTabs() {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update active tab content
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabName + '-tab').classList.add('active');
            
            // Load appropriate data
            if (tabName === 'all-users') {
                loadAllUsers();
            } else if (tabName === 'requests') {
                loadConnectionRequests();
            } else if (tabName === 'my-connections') {
                loadMyConnections();
            }
        });
    });
}

// Start random post generator
function startRandomPostGenerator() {
    // Generate a random post every 30-60 seconds
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every interval
            generateRandomPost();
        }
    }, 30000 + Math.random() * 30000); // 30-60 seconds
}

// Generate a random post
function generateRandomPost() {
    const category = randomPostCategories[Math.floor(Math.random() * randomPostCategories.length)];
    const template = category.templates[Math.floor(Math.random() * category.templates.length)];
    
    // Get random image based on category
    const imageUrls = {
        'Tech': [
            'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=500&h=300&fit=crop',
            'https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=300&fit=crop',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop'
        ],
        'Fitness': [
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop',
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop',
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop'
        ],
        'Education': [
            'https://images.unsplash.com/photo-1523050854058-8df90110c9a1?w=500&h=300&fit=crop',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop',
            'https://images.unsplash.com/photo-1523050854058-8df90110c9a1?w=500&h=300&fit=crop'
        ],
        'Travel': [
            'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500&h=300&fit=crop',
            'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500&h=300&fit=crop',
            'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500&h=300&fit=crop'
        ]
    };

    const randomImage = imageUrls[category.category][Math.floor(Math.random() * imageUrls[category.category].length)];
    
    // Get random sample user
    const sampleUsers = [
        { name: "Priya Sharma", id: "sample_user_1" },
        { name: "Rajesh Kumar", id: "sample_user_2" },
        { name: "Anjali Patel", id: "sample_user_3" },
        { name: "Vikram Singh", id: "sample_user_4" },
        { name: "Meera Reddy", id: "sample_user_5" },
        { name: "Arjun Malhotra", id: "sample_user_6" },
        { name: "Zara Ahmed", id: "sample_user_7" },
        { name: "Krishna Iyer", id: "sample_user_8" }
    ];
    
    const randomUser = sampleUsers[Math.floor(Math.random() * sampleUsers.length)];

    const postData = {
        content: template,
        authorId: randomUser.id,
        authorName: randomUser.name,
        imageUrl: randomImage,
        timestamp: Date.now(),
        likes: Math.floor(Math.random() * 50),
        comments: Math.floor(Math.random() * 10),
        shares: Math.floor(Math.random() * 5)
    };

    database.ref('posts').push(postData);
}

// Generate sample data for realistic posts
function generateSampleData() {
    // Generate sample users if they don't exist
    const sampleUsers = [
        { name: "Priya Sharma", email: "priya.sharma@tech.com", bio: "Software Engineer at Google | AI/ML Enthusiast" },
        { name: "Rajesh Kumar", email: "rajesh.kumar@microsoft.com", bio: "Product Manager | Building the future of tech" },
        { name: "Anjali Patel", email: "anjali.patel@amazon.com", bio: "Data Scientist | Turning data into insights" },
        { name: "Vikram Singh", email: "vikram.singh@netflix.com", bio: "Senior Developer | Full-stack wizard" },
        { name: "Meera Reddy", email: "meera.reddy@apple.com", bio: "UX Designer | Creating beautiful experiences" },
        { name: "Arjun Malhotra", email: "arjun.malhotra@meta.com", bio: "AI Research Engineer | Pushing boundaries" },
        { name: "Zara Ahmed", email: "zara.ahmed@tesla.com", bio: "Robotics Engineer | Building the future" },
        { name: "Krishna Iyer", email: "krishna.iyer@spacex.com", bio: "Aerospace Engineer | Reaching for the stars" }
    ];

    sampleUsers.forEach((user, index) => {
        const userId = `sample_user_${index + 1}`;
        database.ref(`linkedinUsers/${userId}`).once('value')
            .then((snapshot) => {
                if (!snapshot.exists()) {
                    database.ref(`linkedinUsers/${userId}`).set({
                        name: user.name,
                        email: user.email,
                        bio: user.bio
                    });
                }
            });
    });

    // Generate sample posts if they don't exist
    generateSamplePosts();
}

// Generate sample posts with realistic content
function generateSamplePosts() {
    const samplePosts = [
        {
            content: "Just got promoted to Senior Software Engineer! 🎉 After 3 years of hard work, it's finally paying off. Grateful for the amazing team and mentors who supported me throughout this journey. #CareerGrowth #TechLife",
            authorId: "sample_user_1",
            authorName: "Priya Sharma",
            hasImage: true,
            imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=300&fit=crop",
            likes: 45,
            comments: 8,
            shares: 3
        },
        {
            content: "Excited to announce that our team just launched a new AI-powered feature that's already helping thousands of users! The feedback has been incredible. #ProductLaunch #AI #Innovation",
            authorId: "sample_user_2",
            authorName: "Rajesh Kumar",
            hasImage: true,
            imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=500&h=300&fit=crop",
            likes: 32,
            comments: 5,
            shares: 2
        },
        {
            content: "Just completed my first marathon! 🏃‍♀️ 26.2 miles of pure determination. Never thought I could do it, but here we are. Next goal: Ironman! #Marathon #FitnessGoals #NeverGiveUp",
            authorId: "sample_user_3",
            authorName: "Anjali Patel",
            hasImage: true,
            imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
            likes: 67,
            comments: 12,
            shares: 7
        },
        {
            content: "Finally bought my dream car! 🚗 Tesla Model S. The future is electric, and I'm loving every minute of it. The autopilot feature is mind-blowing. #Tesla #ElectricVehicle #DreamCar",
            authorId: "sample_user_4",
            authorName: "Vikram Singh",
            hasImage: true,
            imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500&h=300&fit=crop",
            likes: 89,
            comments: 15,
            shares: 4
        },
        {
            content: "Just published my first research paper on machine learning! 📚 Months of hard work finally seeing the light. The academic community's response has been overwhelming. #Research #MachineLearning #AcademicLife",
            authorId: "sample_user_5",
            authorName: "Meera Reddy",
            hasImage: true,
            imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
            likes: 23,
            comments: 4,
            shares: 1
        },
        {
            content: "Started my own tech company today! 🚀 After years of working for others, it's time to build something of my own. Nervous but excited for this new chapter. #Entrepreneurship #Startup #Tech",
            authorId: "sample_user_6",
            authorName: "Arjun Malhotra",
            hasImage: true,
            imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
            likes: 156,
            comments: 28,
            shares: 12
        },
        {
            content: "Just moved to Silicon Valley! 🌉 The energy here is incredible. So many brilliant minds working on world-changing ideas. Excited to be part of this ecosystem. #SiliconValley #TechLife #NewBeginnings",
            authorId: "sample_user_7",
            authorName: "Zara Ahmed",
            hasImage: true,
            imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500&h=300&fit=crop",
            likes: 78,
            comments: 9,
            shares: 6
        },
        {
            content: "Completed my PhD in Computer Science! 🎓 5 years of research, countless sleepless nights, and it's finally done. Thank you to everyone who supported me through this journey. #PhD #ComputerScience #AcademicAchievement",
            authorId: "sample_user_8",
            authorName: "Krishna Iyer",
            hasImage: true,
            imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9a1?w=500&h=300&fit=crop",
            likes: 234,
            comments: 31,
            shares: 18
        }
    ];

    // Check if posts already exist
    database.ref('posts').once('value')
        .then((snapshot) => {
            if (!snapshot.exists() || snapshot.numChildren() === 0) {
                // Add sample posts with timestamps spread over the last few days
                samplePosts.forEach((post, index) => {
                    const timestamp = Date.now() - (index * 24 * 60 * 60 * 1000); // Spread over days
                    database.ref('posts').push({
                        ...post,
                        timestamp: timestamp
                    });
                });
            }
        });
}

// Check authentication state
function checkAuthState() {
    auth.onAuthStateChanged((user) => {
        console.log('Auth state changed:', user ? 'User logged in' : 'User logged out');
        if (user) {
            currentUser = user;
            console.log('Setting up authenticated UI for user:', user.uid);
            updateUIForAuthenticatedUser();
            loadUserProfile();
            // Load posts only when user is authenticated
            setupPostsListener();
        } else {
            currentUser = null;
            console.log('Setting up unauthenticated UI');
            updateUIForUnauthenticatedUser();
        }
    });
}

// Update UI for authenticated user
function updateUIForAuthenticatedUser() {
    console.log('Updating UI for authenticated user');
    authText.textContent = 'Logout';
    authBtn.querySelector('i').className = 'fas fa-sign-out-alt';
    
    // Show create post section only for authenticated users
    const createPostSection = document.querySelector('.create-post-section');
    if (createPostSection) {
        createPostSection.style.display = 'block';
    }
    
    // Hide login overlay if it's showing
    const loginOverlay = document.getElementById('loginOverlay');
    if (loginOverlay) {
        loginOverlay.style.display = 'none';
    }
}

// Update UI for unauthenticated user
function updateUIForUnauthenticatedUser() {
    console.log('Updating UI for unauthenticated user');
    authText.textContent = 'Login';
    authBtn.querySelector('i').className = 'fas fa-sign-in-alt';
    
    // Hide create post section for unauthenticated users
    const createPostSection = document.querySelector('.create-post-section');
    if (createPostSection) {
        createPostSection.style.display = 'none';
    }
    
    // Clear posts feed and show login overlay
    const postsFeed = document.getElementById('postsFeed');
    if (postsFeed) {
        postsFeed.innerHTML = `
            <div class="login-overlay" id="loginOverlay">
                <div class="login-container">
                    <div class="login-header">
                        <i class="fab fa-linkedin"></i>
                        <h2>Welcome to LinkedIn Clone</h2>
                        <p>Connect with professionals and share your achievements</p>
                    </div>
                    <div class="login-form">
                        <button class="btn btn-primary login-btn" onclick="openAuthModal()">
                            <i class="fas fa-sign-in-alt"></i>
                            Login or Sign Up
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Reset current user
    currentUser = null;
}

// Open auth modal
function openAuthModal() {
    if (currentUser) {
        // Logout
        showLoading(true);
        auth.signOut().then(() => {
            showMessage('Logged out successfully', 'success');
            // Force UI update after logout
            updateUIForUnauthenticatedUser();
            // Navigate to home page and force refresh
            navigateToPage('home');
            // Clear any cached data
            clearCachedData();
            // Force the login overlay to appear
            setTimeout(() => {
                const postsFeed = document.getElementById('postsFeed');
                if (postsFeed && !postsFeed.querySelector('.login-overlay')) {
                    console.log('Forcing login overlay to appear');
                    postsFeed.innerHTML = `
                        <div class="login-overlay" id="loginOverlay">
                            <div class="login-container">
                                <div class="login-header">
                                    <i class="fab fa-linkedin"></i>
                                    <h2>Welcome to LinkedIn Clone</h2>
                                    <p>Connect with professionals and share your achievements</p>
                                </div>
                                <div class="login-form">
                                    <button class="btn btn-primary login-btn" onclick="openAuthModal()">
                                        <i class="fas fa-sign-in-alt"></i>
                                        Login or Sign Up
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }
            }, 100);
        }).catch((error) => {
            showMessage('Error logging out: ' + error.message, 'error');
        }).finally(() => {
            showLoading(false);
        });
    } else {
        // Login/Signup
        authModal.classList.add('active');
        resetAuthForm();
    }
}

// Clear cached data and force fresh state
function clearCachedData() {
    console.log('Clearing cached data');
    // Clear any stored user data
    currentUser = null;
    
    // Force reload of posts feed
    const postsFeed = document.getElementById('postsFeed');
    if (postsFeed) {
        postsFeed.innerHTML = '';
    }
    
    // Reset any cached authentication state
    if (typeof localStorage !== 'undefined') {
        // Clear any Firebase auth tokens that might be cached
        localStorage.removeItem('firebase:authUser:');
    }
}

// Close auth modal
function closeAuthModal() {
    authModal.classList.remove('active');
    resetAuthForm();
    
    // Clear any cached authentication state
    console.log('Auth modal closed, current user:', currentUser);
}

// Reset auth form
function resetAuthForm() {
    authForm.reset();
    isSignUpMode = false;
    selectedProfilePicFile = null;
    if (profilePicPreview) profilePicPreview.style.display = 'none';
    updateAuthModal();
}

// Toggle auth mode (login/signup)
function toggleAuthMode() {
    isSignUpMode = !isSignUpMode;
    updateAuthModal();
}

// Update auth modal based on mode
function updateAuthModal() {
    if (isSignUpMode) {
        modalTitle.textContent = 'Sign Up';
        authSubmitBtn.textContent = 'Sign Up';
        authSwitchText.textContent = 'Already have an account?';
        authSwitchBtn.textContent = 'Login';
        nameGroup.style.display = 'block';
        bioGroup.style.display = 'block';
        profilePicGroup.style.display = 'block';
    } else {
        modalTitle.textContent = 'Login';
        authSubmitBtn.textContent = 'Login';
        authSwitchText.textContent = "Don't have an account?";
        authSwitchBtn.textContent = 'Sign Up';
        nameGroup.style.display = 'none';
        bioGroup.style.display = 'none';
        profilePicGroup.style.display = 'none';
    }
}

// Handle auth form submission
function handleAuthSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const bio = document.getElementById('bio').value;

    showLoading(true);

    if (isSignUpMode) {
        // Sign up
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const profileData = {
                    name: name,
                    email: email,
                    bio: bio || 'No bio available'
                };

                // If there's a profile picture, upload it first
                if (selectedProfilePicFile) {
                    const imageRef = storage.ref(`profile-pictures/${user.uid}_${Date.now()}`);
                    return imageRef.put(selectedProfilePicFile)
                        .then((snapshot) => {
                            return snapshot.ref.getDownloadURL();
                        })
                        .then((imageUrl) => {
                            profileData.profilePicUrl = imageUrl;
                            return saveUserProfile(user.uid, profileData);
                        });
                } else {
                    return saveUserProfile(user.uid, profileData);
                }
            })
            .then(() => {
                showMessage('Account created successfully! You are now logged in.', 'success');
                closeAuthModal();
                // Force refresh the UI to show logged-in state
                setTimeout(() => {
                    if (currentUser) {
                        updateUIForAuthenticatedUser();
                        loadUserProfile();
                        setupPostsListener();
                    }
                }, 500);
            })
            .catch((error) => {
                showMessage('Error creating account: ' + error.message, 'error');
            })
            .finally(() => {
                showLoading(false);
            });
    } else {
        // Login
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                showMessage('Logged in successfully!', 'success');
                closeAuthModal();
            })
            .catch((error) => {
                showMessage('Error logging in: ' + error.message, 'error');
            })
            .finally(() => {
                showLoading(false);
            });
    }
}

// Save user profile to database
function saveUserProfile(userId, profileData) {
    return database.ref(`linkedinUsers/${userId}`).set(profileData);
}

// Load user profile
function loadUserProfile() {
    if (!currentUser) return;
    
    database.ref(`linkedinUsers/${currentUser.uid}`).once('value')
        .then((snapshot) => {
            const userData = snapshot.val();
            if (userData) {
                // Store user data globally
                currentUser.profile = userData;
                
                // Update profile picture if exists
                if (userData.profilePicUrl) {
                    updateProfilePicture(userData.profilePicUrl);
                }
            }
        })
        .catch((error) => {
            console.error('Error loading user profile:', error);
        });
}

// Update profile picture display
function updateProfilePicture(imageUrl) {
    const profileAvatar = document.getElementById('profileAvatar');
    if (profileAvatar && imageUrl) {
        profileAvatar.innerHTML = `<img src="${imageUrl}" alt="Profile Picture">`;
    }
}

// Set up character counter
function setupCharacterCounter() {
    postContent.addEventListener('input', function() {
        const charCount = this.value.length;
        const maxLength = this.getAttribute('maxlength');
        const charCountElement = document.querySelector('.char-count');
        const createPostBtn = document.getElementById('createPostBtn');
        
        charCountElement.textContent = `${charCount}/${maxLength}`;
        
        if (charCount > 0 && charCount <= maxLength) {
            createPostBtn.disabled = false;
        } else {
            createPostBtn.disabled = true;
        }
    });
}

// Create a new post
function createPost() {
    if (!currentUser) {
        showMessage('Please login to create a post', 'error');
        return;
    }

    const content = postContent.value.trim();
    if (!content) {
        showMessage('Please enter some content for your post', 'error');
        return;
    }

    showLoading(true);

    const postData = {
        content: content,
        authorId: currentUser.uid,
        authorName: currentUser.profile?.name || 'Anonymous',
        timestamp: Date.now(),
        likes: 0,
        comments: 0,
        shares: 0
    };

    // If there's an image, upload it first
    if (selectedImageFile) {
        const imageRef = storage.ref(`post-images/${Date.now()}_${selectedImageFile.name}`);
        imageRef.put(selectedImageFile)
            .then((snapshot) => {
                return snapshot.ref.getDownloadURL();
            })
            .then((imageUrl) => {
                postData.imageUrl = imageUrl;
                return database.ref('posts').push(postData);
            })
            .then(() => {
                resetPostForm();
                showMessage('Post created successfully!', 'success');
            })
            .catch((error) => {
                showMessage('Error creating post: ' + error.message, 'error');
            })
            .finally(() => {
                showLoading(false);
            });
    } else {
        // No image, just create the post
        database.ref('posts').push(postData)
            .then(() => {
                resetPostForm();
                showMessage('Post created successfully!', 'success');
            })
            .catch((error) => {
                showMessage('Error creating post: ' + error.message, 'error');
            })
            .finally(() => {
                showLoading(false);
            });
    }
}

// Reset post form
function resetPostForm() {
    postContent.value = '';
    selectedImageFile = null;
    postImage.value = '';
    imagePreview.style.display = 'none';
    addImageBtn.style.display = 'inline-flex';
    document.querySelector('.char-count').textContent = '0/500';
    createPostBtn.disabled = true;
}

// Set up real-time posts listener (only for initial load, not auto-refresh)
function setupPostsListener() {
    // Only load posts if user is authenticated
    if (currentUser) {
        database.ref('posts').orderByChild('timestamp').once('value')
            .then((snapshot) => {
                const posts = [];
                snapshot.forEach((childSnapshot) => {
                    posts.unshift({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                renderPosts(posts);
            })
            .catch((error) => {
                console.error('Error loading posts:', error);
                // If there's a permission error, show login overlay
                if (error.code === 'PERMISSION_DENIED') {
                    updateUIForUnauthenticatedUser();
                }
            });
    } else {
        // User not authenticated, show login overlay
        updateUIForUnauthenticatedUser();
    }
}

// Render posts in the feed
function renderPosts(posts) {
    if (posts.length === 0) {
        postsFeed.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-comments"></i>
                <h3>No posts yet</h3>
                <p>Be the first to share something!</p>
            </div>
        `;
        return;
    }

    postsFeed.innerHTML = posts.map(post => `
        <div class="post" data-post-id="${post.id}">
            <div class="post-header">
                <div class="post-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="post-author">
                    <div class="post-author-name">${escapeHtml(post.authorName)}</div>
                    <div class="post-timestamp">${formatTimestamp(post.timestamp)}</div>
                </div>
            </div>
            <div class="post-content">${escapeHtml(post.content)}</div>
            ${post.imageUrl ? `
                <div class="post-image">
                    <img src="${post.imageUrl}" alt="Post image" loading="lazy">
                </div>
            ` : ''}
            <div class="post-actions">
                <div class="post-action ${post.likedBy && post.likedBy[currentUser?.uid] ? 'liked' : ''}" 
                     onclick="handleLike(event, '${post.id}', ${post.likes || 0})">
                    <i class="far fa-heart"></i>
                    <span>${post.likes || 0}</span>
                </div>
                <div class="post-action" onclick="handleComment(event, '${post.id}')">
                    <i class="far fa-comment"></i>
                    <span>${post.comments || 0}</span>
                </div>
                <div class="post-action" onclick="handleShare(event, '${post.id}')">
                    <i class="fas fa-share"></i>
                    <span>${post.shares || 0}</span>
                </div>
            </div>
            <div class="comments-section" id="comments-${post.id}" style="display: none;">
                <div class="comments-list" id="comments-list-${post.id}">
                    <!-- Comments will be loaded here -->
                </div>
                <div class="comment-input">
                    <input type="text" placeholder="Write a comment..." id="comment-input-${post.id}">
                    <button onclick="submitComment('${post.id}')">Post</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Handle like action
function handleLike(event, postId, currentLikes) {
    event.preventDefault();
    event.stopPropagation();
    
    if (!currentUser) {
        showMessage('Please login to like posts', 'error');
        return;
    }

    const likeButton = event.currentTarget;
    const likeIcon = likeButton.querySelector('i');
    const likeCount = likeButton.querySelector('span');
    
    // Toggle like state immediately for better UX
    const isLiked = likeButton.classList.contains('liked');
    
    if (isLiked) {
        // Unlike
        likeButton.classList.remove('liked');
        likeIcon.className = 'far fa-heart';
        likeCount.textContent = parseInt(likeCount.textContent) - 1;
    } else {
        // Like
        likeButton.classList.add('liked');
        likeIcon.className = 'fas fa-heart';
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
    }

    // Update database
    const postRef = database.ref(`posts/${postId}`);
    const likeRef = database.ref(`posts/${postId}/likedBy/${currentUser.uid}`);
    
    if (isLiked) {
        likeRef.remove().then(() => {
            return postRef.update({
                likes: currentLikes - 1
            });
        }).catch((error) => {
            // Revert UI if database update fails
            likeButton.classList.add('liked');
            likeIcon.className = 'fas fa-heart';
            likeCount.textContent = parseInt(likeCount.textContent) + 1;
            showMessage('Error updating like: ' + error.message, 'error');
        });
    } else {
        likeRef.set(true).then(() => {
            return postRef.update({
                likes: currentLikes + 1
            });
        }).catch((error) => {
            // Revert UI if database update fails
            likeButton.classList.remove('liked');
            likeIcon.className = 'far fa-heart';
            likeCount.textContent = parseInt(likeCount.textContent) - 1;
            showMessage('Error updating like: ' + error.message, 'error');
        });
    }
}

// Handle comment action
function handleComment(event, postId) {
    event.preventDefault();
    event.stopPropagation();
    
    if (!currentUser) {
        showMessage('Please login to comment', 'error');
        return;
    }
    
    const commentsSection = document.getElementById(`comments-${postId}`);
    const isVisible = commentsSection.style.display !== 'none';
    
    if (isVisible) {
        commentsSection.style.display = 'none';
    } else {
        commentsSection.style.display = 'block';
        loadComments(postId);
    }
}

// Load comments for a post
function loadComments(postId) {
    const commentsList = document.getElementById(`comments-list-${postId}`);
    
    // Generate some sample comments for realism
    const sampleComments = [
        { text: "Congratulations! This is amazing work.", author: "Rajesh Kumar", time: "2 hours ago" },
        { text: "Inspiring! Keep up the great work.", author: "Anjali Patel", time: "1 hour ago" },
        { text: "This is exactly what the industry needs right now.", author: "Vikram Singh", time: "30 minutes ago" }
    ];
    
    commentsList.innerHTML = sampleComments.map(comment => `
        <div class="comment">
            <div class="comment-author">${comment.author}</div>
            <div class="comment-text">${comment.text}</div>
            <div class="comment-time">${comment.time}</div>
        </div>
    `).join('');
}

// Submit comment
function submitComment(postId) {
    const commentInput = document.getElementById(`comment-input-${postId}`);
    const comment = commentInput.value.trim();
    
    if (comment) {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <div class="comment-author">${currentUser.profile?.name || 'You'}</div>
            <div class="comment-text">${escapeHtml(comment)}</div>
            <div class="comment-time">Just now</div>
        `;
        
        const commentsList = document.getElementById(`comments-list-${postId}`);
        commentsList.appendChild(commentElement);
        
        commentInput.value = '';
        showMessage('Comment added!', 'success');
    }
}

// Handle share action
function handleShare(event, postId) {
    event.preventDefault();
    event.stopPropagation();
    
    if (!currentUser) {
        showMessage('Please login to share posts', 'error');
        return;
    }
    
    const shareButton = event.currentTarget;
    const shareCount = shareButton.querySelector('span');
    const currentShares = parseInt(shareCount.textContent);
    
    // Update UI immediately
    shareCount.textContent = currentShares + 1;
    
    // Update database
    database.ref(`posts/${postId}`).update({ shares: currentShares + 1 })
        .then(() => {
            showMessage('Post shared!', 'success');
        })
        .catch((error) => {
            // Revert UI if database update fails
            shareCount.textContent = currentShares;
            showMessage('Error sharing post: ' + error.message, 'error');
        });
}

// Load all users for connections
function loadAllUsers() {
    if (!currentUser) return;

    // First get all users
    database.ref('linkedinUsers').once('value')
        .then((snapshot) => {
            const users = [];
            snapshot.forEach((childSnapshot) => {
                if (childSnapshot.key !== currentUser.uid) {
                    users.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                }
            });
            
            // Then check connection status for each user
            return Promise.all(users.map(user => {
                return checkConnectionStatus(user.id).then(status => {
                    user.connectionStatus = status;
                    return user;
                });
            }));
        })
        .then((users) => {
            renderAllUsers(users);
        })
        .catch((error) => {
            console.error('Error loading users:', error);
        });
}

// Check connection status between current user and target user
function checkConnectionStatus(targetUserId) {
    return new Promise((resolve) => {
        // Check if there's a pending request from current user to target
        database.ref('connectionRequests')
            .orderByChild('fromUserId')
            .equalTo(currentUser.uid)
            .once('value')
            .then((snapshot) => {
                let status = 'none'; // none, pending, connected
                
                snapshot.forEach((childSnapshot) => {
                    const request = childSnapshot.val();
                    if (request.toUserId === targetUserId) {
                        if (request.status === 'pending') {
                            status = 'pending';
                        } else if (request.status === 'accepted') {
                            status = 'connected';
                        }
                    }
                });
                
                // Also check if there's an accepted connection
                if (status === 'none') {
                    return database.ref('connections').once('value');
                } else {
                    resolve(status);
                }
            })
            .then((connectionsSnapshot) => {
                if (connectionsSnapshot) {
                    let status = 'none';
                    connectionsSnapshot.forEach((childSnapshot) => {
                        const connection = childSnapshot.val();
                        if ((connection.user1Id === currentUser.uid && connection.user2Id === targetUserId) ||
                            (connection.user2Id === currentUser.uid && connection.user1Id === targetUserId)) {
                            status = 'connected';
                        }
                    });
                    resolve(status);
                }
            })
            .catch(() => {
                resolve('none');
            });
    });
}

// Render all users
function renderAllUsers(users) {
    const allUsersList = document.getElementById('allUsersList');
    
    if (users.length === 0) {
        allUsersList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-users"></i>
                <h3>No users found</h3>
                <p>Be the first to join!</p>
            </div>
        `;
        return;
    }

    allUsersList.innerHTML = users.map(user => `
        <div class="user-card">
            <div class="user-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="user-info">
                <div class="user-name">${escapeHtml(user.name)}</div>
                <div class="user-email">${escapeHtml(user.email)}</div>
                <div class="user-bio">${escapeHtml(user.bio)}</div>
            </div>
            <button class="connection-btn ${user.connectionStatus}" 
                    onclick="handleConnectionAction('${user.id}', '${user.connectionStatus}')"
                    ${user.connectionStatus !== 'none' ? 'disabled' : ''}>
                ${user.connectionStatus === 'pending' ? 'Pending' : 
                  user.connectionStatus === 'connected' ? 'Connected' : 'Connect'}
            </button>
        </div>
    `).join('');
}

// Handle connection action (send request, cancel, etc.)
function handleConnectionAction(targetUserId, currentStatus) {
    if (currentStatus === 'none') {
        sendConnectionRequest(targetUserId);
    } else if (currentStatus === 'pending') {
        cancelConnectionRequest(targetUserId);
    }
}

// Send connection request
function sendConnectionRequest(targetUserId) {
    if (!currentUser) return;

    const requestData = {
        fromUserId: currentUser.uid,
        fromUserName: currentUser.profile?.name || 'Anonymous',
        toUserId: targetUserId,
        timestamp: Date.now(),
        status: 'pending'
    };

    database.ref('connectionRequests').push(requestData)
        .then(() => {
            showMessage('Connection request sent!', 'success');
            // Refresh the users list to update button states
            loadAllUsers();
        })
        .catch((error) => {
            showMessage('Error sending request: ' + error.message, 'error');
        });
}

// Cancel connection request
function cancelConnectionRequest(targetUserId) {
    if (!currentUser) return;

    database.ref('connectionRequests')
        .orderByChild('fromUserId')
        .equalTo(currentUser.uid)
        .once('value')
        .then((snapshot) => {
            const promises = [];
            snapshot.forEach((childSnapshot) => {
                const request = childSnapshot.val();
                if (request.toUserId === targetUserId && request.status === 'pending') {
                    promises.push(database.ref(`connectionRequests/${childSnapshot.key}`).remove());
                }
            });
            return Promise.all(promises);
        })
        .then(() => {
            showMessage('Connection request cancelled!', 'info');
            loadAllUsers(); // Refresh the list
        })
        .catch((error) => {
            showMessage('Error cancelling request: ' + error.message, 'error');
        });
}

// Load connection requests
function loadConnectionRequests() {
    if (!currentUser) return;

    database.ref('connectionRequests').orderByChild('toUserId').equalTo(currentUser.uid).once('value')
        .then((snapshot) => {
            const requests = [];
            snapshot.forEach((childSnapshot) => {
                const request = childSnapshot.val();
                if (request.status === 'pending') {
                    requests.push({
                        id: childSnapshot.key,
                        ...request
                    });
                }
            });
            renderConnectionRequests(requests);
        })
        .catch((error) => {
            console.error('Error loading requests:', error);
        });
}

// Render connection requests
function renderConnectionRequests(requests) {
    const requestsList = document.getElementById('requestsList');
    
    if (requests.length === 0) {
        requestsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-user-plus"></i>
                <h3>No pending requests</h3>
                <p>You're all caught up!</p>
            </div>
        `;
        return;
    }

    requestsList.innerHTML = requests.map(request => `
        <div class="user-card">
            <div class="user-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="user-info">
                <div class="user-name">${escapeHtml(request.fromUserName)}</div>
                <div class="user-email">Connection Request</div>
                <div class="user-bio">Wants to connect with you</div>
            </div>
            <div>
                <button class="connection-btn" onclick="acceptConnection('${request.id}', '${request.fromUserId}')">
                    Accept
                </button>
                <button class="connection-btn" onclick="rejectConnection('${request.id}')" style="margin-left: 10px; background: #f44336; border-color: #f44336;">
                    Reject
                </button>
            </div>
        </div>
    `).join('');
}

// Accept connection
function acceptConnection(requestId, fromUserId) {
    // Update request status
    database.ref(`connectionRequests/${requestId}`).update({ status: 'accepted' })
        .then(() => {
            // Add to connections
            const connectionData = {
                user1Id: currentUser.uid,
                user1Name: currentUser.profile?.name || 'Anonymous',
                user2Id: fromUserId,
                timestamp: Date.now()
            };
            return database.ref('connections').push(connectionData);
        })
        .then(() => {
            showMessage('Connection accepted!', 'success');
            loadConnectionRequests(); // Refresh the list
        })
        .catch((error) => {
            showMessage('Error accepting connection: ' + error.message, 'error');
        });
}

// Reject connection
function rejectConnection(requestId) {
    database.ref(`connectionRequests/${requestId}`).update({ status: 'rejected' })
        .then(() => {
            showMessage('Connection rejected', 'info');
            loadConnectionRequests(); // Refresh the list
        })
        .catch((error) => {
            showMessage('Error rejecting connection: ' + error.message, 'error');
        });
}

// Load my connections
function loadMyConnections() {
    if (!currentUser) return;

    database.ref('connections').once('value')
        .then((snapshot) => {
            const connectionPromises = [];
            
            snapshot.forEach((childSnapshot) => {
                const connection = childSnapshot.val();
                if (connection.user1Id === currentUser.uid || connection.user2Id === currentUser.uid) {
                    const otherUserId = connection.user1Id === currentUser.uid ? connection.user2Id : connection.user1Id;
                    
                    // Get the other user's full profile
                    const userPromise = database.ref(`linkedinUsers/${otherUserId}`).once('value')
                        .then((userSnapshot) => {
                            const userData = userSnapshot.val();
                            if (userData) {
                                return {
                                    id: childSnapshot.key,
                                    ...userData
                                };
                            }
                            return null;
                        });
                    
                    connectionPromises.push(userPromise);
                }
            });
            
            return Promise.all(connectionPromises);
        })
        .then((connections) => {
            // Filter out null values
            const validConnections = connections.filter(conn => conn !== null);
            renderMyConnections(validConnections);
        })
        .catch((error) => {
            console.error('Error loading connections:', error);
        });
}

// Render my connections
function renderMyConnections(connections) {
    const myConnectionsList = document.getElementById('myConnectionsList');
    
    if (connections.length === 0) {
        myConnectionsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-user-friends"></i>
                <h3>No connections yet</h3>
                <p>Start connecting with other professionals!</p>
            </div>
        `;
        return;
    }

    myConnectionsList.innerHTML = connections.map(connection => `
        <div class="user-card">
            <div class="user-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="user-info">
                <div class="user-name">${escapeHtml(connection.name)}</div>
                <div class="user-email">${escapeHtml(connection.email)}</div>
                <div class="user-bio">${escapeHtml(connection.bio)}</div>
            </div>
            <button class="connection-btn connected">
                Connected
            </button>
        </div>
    `).join('');
}

// Navigate to different pages
function navigateToPage(pageName) {
    console.log('Navigating to page:', pageName);
    
    // Update navigation links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });

    // Show/hide pages
    pages.forEach(page => {
        page.classList.remove('active');
        if (page.id === pageName + 'Page') {
            page.classList.add('active');
        }
    });

    // Load page-specific data
    if (pageName === 'profile' && currentUser) {
        loadProfilePage();
    } else if (pageName === 'connections' && currentUser) {
        loadAllUsers(); // Load the default tab
    } else if (pageName === 'home') {
        // If navigating to home and not authenticated, ensure login overlay shows
        if (!currentUser) {
            console.log('User not authenticated, showing login overlay on home page');
            setTimeout(() => {
                const postsFeed = document.getElementById('postsFeed');
                if (postsFeed && !postsFeed.querySelector('.login-overlay')) {
                    postsFeed.innerHTML = `
                        <div class="login-overlay" id="loginOverlay">
                            <div class="login-container">
                                <div class="login-header">
                                    <i class="fab fa-linkedin"></i>
                                    <h2>Welcome to LinkedIn Clone</h2>
                                    <p>Connect with professionals and share your achievements</p>
                                </div>
                                <div class="login-form">
                                    <button class="btn btn-primary login-btn" onclick="openAuthModal()">
                                        <i class="fas fa-sign-in-alt"></i>
                                        Login or Sign Up
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }
            }, 50);
        }
    }
}

// Load profile page data
function loadProfilePage() {
    if (!currentUser) {
        showMessage('Please login to view your profile', 'error');
        return;
    }

    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profileBio = document.getElementById('profileBio');
    const userPosts = document.getElementById('userPosts');

    // Update profile info
    profileName.textContent = currentUser.profile?.name || 'User Name';
    profileEmail.textContent = currentUser.profile?.email || 'user@email.com';
    profileBio.textContent = currentUser.profile?.bio || 'No bio available';

    // Load user's posts
    database.ref('posts').orderByChild('authorId').equalTo(currentUser.uid).once('value')
        .then((snapshot) => {
            const posts = [];
            snapshot.forEach((childSnapshot) => {
                posts.unshift({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            renderUserPosts(posts);
        })
        .catch((error) => {
            console.error('Error loading user posts:', error);
            userPosts.innerHTML = '<p>Error loading posts</p>';
        });
}

// Render user posts in profile page
function renderUserPosts(posts) {
    const userPosts = document.getElementById('userPosts');
    
    if (posts.length === 0) {
        userPosts.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-edit"></i>
                <h3>No posts yet</h3>
                <p>Start sharing your thoughts!</p>
            </div>
        `;
        return;
    }

    userPosts.innerHTML = posts.map(post => `
        <div class="post" data-post-id="${post.id}">
            <div class="post-header">
                <div class="post-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="post-author">
                    <div class="post-author-name">${escapeHtml(post.authorName)}</div>
                    <div class="post-timestamp">${formatTimestamp(post.timestamp)}</div>
                </div>
            </div>
            <div class="post-content">${escapeHtml(post.content)}</div>
            ${post.imageUrl ? `
                <div class="post-image">
                    <img src="${post.imageUrl}" alt="Post image" loading="lazy">
                </div>
            ` : ''}
        </div>
    `).join('');
}

// Utility functions
function showLoading(show) {
    if (show) {
        loadingSpinner.classList.add('active');
    } else {
        loadingSpinner.classList.remove('active');
    }
}

function showMessage(message, type = 'info') {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
        return 'Just now';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add CSS animations for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style); 