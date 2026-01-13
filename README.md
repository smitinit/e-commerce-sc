# Mini Shopping Web Application

## Project Overview

- The Mini Shopping Web Application is a lightweight client-side e-commerce application where users can register, log in, browse products, add items to a cart, and manage their profile. The project focuses on implementing basic authentication, product listing, cart management, and user interface interactions using only frontend technologies

### Key Objectives

#### The main objectives of the project include:

- ✔ Implementing a user authentication system (Signup/Login)
- ✔ Displaying a product catalog retrieved from a mock API
- ✔ Providing cart functionality with dynamic totals and item quantity controls
- ✔ Allowing the user to edit profile information
- ✔ Presenting a clean and usable UI with search, filters, and navigation.

### Core Features

1. User Registration (Signup)
   Allows new users to create an account
   Required fields: Name, Email, Password, Confirm Password
   Validations: - Email format check - Password min length (6+ chars) - Confirm password matching - Prevent duplicate email registration
   On successful signup, user details are saved into localStorage

2. User Login
   Allows registered users to log in via email + password
   Validates credentials using stored user data from localStorage
   On success, store logged-in user information in localStorage and redirect to product list
   Invalid credentials must display appropriate error messages

3. Product Listing Page
   Displays products retrieved from a mock products API
   Each product shows: - Image - Title - Price - Category - “Add to Cart” button
   Includes: - Search bar (filter by title) - Optional category filter
4. Shopping Cart
   Users can add products to cart
   If product already exists, increase quantity instead of duplicating
   Cart displays:
   Product name & image - Unit price - Quantity controls (+ / -) - Remove button
   Cart summary shows: - Subtotal - Tax (18% assumed) - Final total amount
5. User Profile Management
   User can edit: - Name - Email - Password
   Updated profile should persist to localStorage

6. Header Navigation
   Header shows: - Logged-in user name - Products link - Cart with item count - Edit Profile - Logout button
7. Logout
   Clears active user session from localStorage
   Redirects to login page

```
API: https://dummyjson.com/products
```
