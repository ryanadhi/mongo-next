import dbConnect from "../../../utils/dbConnect";
import Note from "../../../models/Note";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const note = await Note.findById(id);
        if (!note) {
          return res.status(400).json({
            status: { success: false, code: 400 },
            error: "No data found",
          });
        }
        return res
          .status(200)
          .json({ status: { success: true, code: 200 }, data: note });
      } catch (error) {
        res
          .status(400)
          .json({ status: { success: false, code: 400 }, error: error });
      }
      break;
    case "PUT":
      try {
        const note = await Note.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!note) {
          return res.status(400).json({
            status: { success: false, code: 400 },
            error: "No data found",
          });
        }
        return res
          .status(200)
          .json({ status: { success: true, code: 200 }, data: note });
      } catch (error) {
        res
          .status(400)
          .json({ status: { success: false, code: 400 }, error: error });
      }
      break;
    case "DELETE":
      try {
        const deletedNote = await Note.deleteOne({ _id: id });
        if (!deletedNote) {
          return res.status(400).json({
            status: { success: false, code: 400 },
            error: "No data found",
          });
        }

        return res
          .status(200)
          .json({ status: { success: true, code: 200 }, data: {} });
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
