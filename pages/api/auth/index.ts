import { UserType } from "../../../utilities/enum";

export default function handler(req: any, res: any) {
  switch (req.method) {
    case "GET": {
      //enter data to be sent as response in brackets
      res.status(200).json("GET Success");
      break;
    }
    case "POST": {
      //post request stores signup data of seller and buyer

      //Do not parse this to json this is JS object
      const body = req.body;

      const userType = body.userType;
      const data = body.data;

      if (userType === UserType.Buyer) {
        res.status(200).json(data);
      } else {
        res.status(200).json(data);
      }

      break;
    }
    default: {
      res.status(404).json("Not Found");
      break;
    }
  }
}
