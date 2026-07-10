# Boilerplate Expansion: Validation & Refresh Tokens

You are absolutely right! A truly production-ready boilerplate needs strict input validation and a secure two-token system (Access + Refresh tokens). Looking at the `plan.md` you just created, these perfectly align with your Week 2 and Week 3 goals.

Before we start writing code, let's review the architectural plan for how we will implement these two advanced features.

## Proposed Changes

### 1. Input Validation with Joi (Week 2)
Currently, a user could send an empty email or a 1-character password, and our controller would try to save it. We need a bouncer at the door.

#### Files to Create/Modify:
- **`[NEW] src/validators/authValidator.js`**: We will create Joi schemas here. A schema defines the exact shape of data we expect (e.g., `email` must be a valid email string, `password` must be > 6 chars).
- **`[NEW] src/middleware/validate.js`**: We will write a dynamic middleware function. It will take a Joi schema, compare `req.body` against it, and immediately throw a 400 Bad Request error if validation fails—protecting our controllers.
- **`[MODIFY] src/routes/authRoutes.js`**: We will drop this middleware into our routes (e.g., `router.post('/register', validate(registerSchema), register);`).

### 2. The Refresh Token Lifecycle (Week 3)
Right now, our token lasts for 30 days. If a hacker steals it, they own that account for a month! The modern standard is a two-token system:
1. **Access Token**: Lasts 15 minutes. Used for API requests.
2. **Refresh Token**: Lasts 7 days. Stored in an **HTTP-only cookie** (safe from XSS attacks). Used *only* to get new Access Tokens.

#### Files to Create/Modify:
- **`[MODIFY] src/utils/generateToken.js`**: We will split this into two functions: one for the Access Token and one for the Refresh Token.
- **`[MODIFY] src/controllers/authController.js`**: 
  - Update `register` and `login` to attach the Refresh Token to the response as an HTTP-only cookie.
  - **New Function**: `refreshToken` - Reads the cookie, verifies it, and issues a new Access Token.
  - **New Function**: `logout` - Clears the HTTP-only cookie to securely log the user out.
- **`[MODIFY] src/routes/authRoutes.js`**: Add the new `/refresh` and `/logout` endpoints.

## User Review Required
Does this high-level architectural plan make sense to you? Once you approve it, we will put our Tutor hats back on and tackle **Input Validation with Joi** as our very first concept!
