const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { rssService } = require("../services");

const getRssFeed = catchAsync(async (req, res) => {
  const rssFeed = await rssService.getRssFeedList();

  if (rssFeed)
    res.status(httpStatus.CREATED).send({ message: "Success", data: rssFeed });
  else res.status(httpStatus.NOT_FOUND).send({ message: "Error" });
});

const getRssFeedDetails = catchAsync(async (req, res) => {
  const rssFeed = await rssService.getRssFeedListDetails(req.params.id);

  if (rssFeed)
    res.status(httpStatus.CREATED).send({ message: "Success", data: rssFeed });
  else res.status(httpStatus.NOT_FOUND).send({ message: "Error" });
});

const getRssSources = catchAsync(async (req, res) => {
  const rssSources = await rssService.getRssSourcesList();

  if (rssSources)
    res
      .status(httpStatus.CREATED)
      .send({ message: "Success", data: rssSources });
  else res.status(httpStatus.NOT_FOUND).send({ message: "Error" });
});

const updateRssSources = catchAsync(async (req, res) => {
  const source = await rssService.modifySource(
    req.body.sourceID,
    req.body.enabled
  );

  if (source)
    res.status(httpStatus.CREATED).send({ message: "Success", data: source });
  else res.status(httpStatus.NOT_FOUND).send({ message: "Error" });
});

module.exports = {
  getRssFeed,
  getRssFeedDetails,
  getRssSources,
  updateRssSources,
};
