const logOutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "user loggedout successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

export { logOutUser };
