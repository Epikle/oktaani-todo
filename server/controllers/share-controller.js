import HttpError from '../models/http-error.js';
import Share from '../models/share.js';

export const createNewShare = async (req, res, next) => {
  const { shareData } = req.body;
  const createdShare = new Share(shareData);

  try {
    await createdShare.save();
  } catch (err) {
    return next(new HttpError('Something went wrong.', 500));
  }
  res.json({ message: 'Collection shared...' });
};

export const getShareById = async (req, res, next) => {
  const shareId = req.params.id;

  let sharedCollection;

  try {
    sharedCollection = await Share.find(
      { shareId: shareId },
      { __v: 0, _id: 0 }
    );
  } catch (err) {
    return next(new HttpError('Something went wrong.', 500));
  }

  res.json({ sharedCollection });
};

export const deleteShareById = async (req, res, next) => {
  const shareId = req.params.id;

  try {
    await Share.deleteOne({ shareId: shareId });
  } catch (err) {
    return next(new HttpError('Something went wrong.', 500));
  }
  res.json({ message: 'Share deleted...' });
};
