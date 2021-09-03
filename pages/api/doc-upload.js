import formidable from "formidable";

export const config = {
    api: {
        bodyParser: false
    }
};

export default function handler(req, res) {
    res.status(200).json({ name: 'John Doe' })
}
  