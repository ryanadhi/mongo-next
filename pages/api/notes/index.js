import dbConnect from "../../../utils/dbConnect";
import Note from "../../../models/Note";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const notes = await Note.find({});
        res
          .status(200)
          .json({ status: { success: true, code: 200 }, data: notes });
      } catch (error) {
        res
          .status(400)
          .json({ status: { success: false, code: 400 }, error: error });
      }
      break;
    case "POST":
      try {
        const note = await Note.create(req.body);
        res
          .status(201)
          .json({ status: { success: true, code: 201 }, data: note });
      } catch (error) {
        res
          .status(400)
          .json({ status: { success: false, code: 400 }, error: error });
      }
      break;
    default:
      res.status(400).json({ status: { success: false, code: 400 } });
      break;
  }
};
