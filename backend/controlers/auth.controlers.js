export const signUp = async (req, res) => {
  try {
    console.log("SIGNUP BODY 👉", req.body);
    res.status(200).json({
      success: true,
      message: "Signup controller working",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
};

export const signIn = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Signin controller working",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Signin failed",
    });
  }
};

export const signOut = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Signout controller working",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Signout failed",
    });
  }
};
