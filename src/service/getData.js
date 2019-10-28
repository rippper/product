import Api from './api'
import fetch from './fetch'

/**
 *判断用户是否存在
 */
export const CheckUserIsExit = (data) => fetch.post(Api.CheckUserIsExit.url,
  { ...Api.CheckUserIsExit.data, ...data })

/**
 *判断用户在线状态
 */
export const CheckLoginStatus = (data) => fetch.post(Api.CheckLoginStatus.url,
  { ...Api.CheckLoginStatus.data, ...data })

/**
 * 登陆
 */
export const Login = (data) => fetch.post(Api.Login.url, { ...Api.Login.data, ...data })

/**
 * 登陆2
 */
export const Login2 = (data) => fetch.post(Api.Login2.url, { ...Api.Login2.data, ...data })

/**
 * 用户信息
 */
export const GetUserInfo = (data) => fetch.post(Api.GetUserInfo.url,
  { ...Api.GetUserInfo.data, ...data })
/**
 * 用户信息
 */
export const GetUserInfoById = (data) => fetch.post(Api.GetUserInfoById.url,
  { ...Api.GetUserInfoById.data, ...data })

/**
 * 轮播
 */
export const GetLink = (data) => fetch.post(Api.GetLink.url, { ...Api.GetLink.data, ...data })

/**
 * 课程列表
 */
export const GetCourseInfoList = (data) => fetch.post(Api.GetCourseInfoList.url,
  { ...Api.GetCourseInfoList.data, ...data })

/**
 * 热门课程
 */
export const RecommendCourse = (data) => fetch.post(Api.RecommendCourse.url,
  { ...Api.RecommendCourse.data, ...data })

/**
 * 课程分类
 */
export const GetChannelInfoList = (data) => fetch.post(Api.GetChannelInfoList.url,
  { ...Api.GetChannelInfoList.data, ...data })
/**
 * 考试分类
 */
export const GetExamType = (data) => fetch.post(Api.GetExamType.url,
  { ...Api.GetExamType.data, ...data })

/**
 * 考试列表
 */
export const GetExamList = (data) => fetch.post(Api.GetExamList.url,
  { ...Api.GetExamList.data, ...data })

/**
 * 我的考试列表
 */
export const GetMyExamList = (data) => fetch.post(Api.GetMyExamList.url,
  { ...Api.GetMyExamList.data, ...data })
/**
 * 获取考试题
 */
export const GetExam = (data) => fetch.post(Api.GetExam.url, { ...Api.GetExam.data, ...data })
/**
 * 获取在线练习
 */
export const GetExamPracticeList = (data) => fetch.post(Api.GetExamPracticeList.url,
  { ...Api.GetExamPracticeList.data, ...data })

/**
 * 提交考试题
 */
export const UpdateUserExam = (data) => fetch.post(Api.UpdateUserExam.url,
  { ...Api.UpdateUserExam.data, ...data })
/**
 * 提交考试题
 */
export const GetExamUserRank = (data) => fetch.post(Api.GetExamUserRank.url,
  { ...Api.GetExamUserRank.data, ...data })
/**
 * 退出登录
 */
export const LoginOut = (data) => fetch.post(Api.LoginOut.url, { ...Api.LoginOut.data, ...data })

/**
 * 解除微信绑定
 */
export const DelBind = (data) => fetch.post(Api.DelBind.url, { ...Api.DelBind.data, ...data })

/**
 * 消息中心
 */
export const GetMessageCenter = (data) => fetch.post(Api.GetMessageCenter.url,
  { ...Api.GetMessageCenter.data, ...data })
/**
 * 通知内容
 */
export const GetNoticeInfoContent = (data) => fetch.get(
  Api.GetNoticeInfoContent.url + '/' + data.Id, { ...Api.GetNoticeInfoContent.data, ...data })
/**
 * 课程详情
 */
export const GetCourseDetail = (data) => fetch.post(Api.GetCourseDetail.url,
  { ...Api.GetCourseDetail.data, ...data })

/**
 *  历史记录 Type => All:表示所有， Today:表示今天记录，Earlier:表示更早
 */
export const GetHistoryCourse = (data) => fetch.post(Api.GetHistoryCourse.url,
  { ...Api.GetHistoryCourse.data, ...data })

/**
 *  用户课程列表 Finish => 1：完成课程，0：未完成课程 ,2：表示全部
 */
export const GetUserCourseInfoList = (data) => fetch.post(Api.GetUserCourseInfoList.url,
  { ...Api.GetUserCourseInfoList.data, ...data })

/**
 *  文章频道
 */
export const GetArticleChannelInfoList = (data) => fetch.post(Api.GetArticleChannelInfoList.url,
  { ...Api.GetArticleChannelInfoList.data, ...data })

/**
 *  文章列表
 */
export const GetArticleInfoList = (data) => fetch.post(Api.GetArticleInfoList.url,
  { ...Api.GetArticleInfoList.data, ...data })

/**
 *  文章详情
 */
export const ArticleDetail = (data) => fetch.post(Api.ArticleDetail.url,
  { ...Api.ArticleDetail.data, ...data })

/**
 *  文章详情
 */
export const GetArticleDetailMore = (data) => fetch.post(Api.GetArticleDetailMore.url,
  { ...Api.GetArticleDetailMore.data, ...data })

/**
 *  通知公告
 */
export const GetNoticeInfoList = (data) => fetch.post(Api.GetNoticeInfoList.url,
  { ...Api.GetNoticeInfoList.data, ...data })

/**
 *  排行榜 RankType => 1：学时， 2：课程，3：单位
 */
export const GetRankInfoList = (data) => fetch.post(Api.GetRankInfoList.url,
  { ...Api.GetRankInfoList.data, ...data })

/**
 *  培训班分类
 */
export const GetTrainingTypeList = (data) => fetch.post(Api.GetTrainingTypeList.url,
  { ...Api.GetTrainingTypeList.data, ...data })

/**
 *  培训班列表 JoinStatus => Join：参加； UnJoin：未参加 ；UnAudit：审核中；
 */
export const GetTrainingClass = (data) => fetch.post(Api.GetTrainingClass.url,
  { ...Api.GetTrainingClass.data, ...data })

/**
 *  培训班详情
 */
export const GetTrainingDetail = (data) => fetch.post(Api.GetTrainingDetail.url,
  { ...Api.GetTrainingDetail.data, ...data })

/**
 *  签到列表
 */
export const GetClassUserSignList = (data) => fetch.post(Api.GetClassUserSignList.url,
  { ...Api.GetClassUserSignList.data, ...data })

/**
 *  获取微信签名
 */
export const GetWechatWxAuthModel = (data) => fetch.post(Api.GetWechatWxAuthModel.url,
  { ...Api.GetWechatWxAuthModel.data, ...data })

/**
 *  签到或签退
 */
export const TrainingSignIn = (data) => fetch.post(Api.TrainingSignIn.url,
  { ...Api.TrainingSignIn.data, ...data })

/**
 *  取消报名
 */
export const UpdateTrainingStudentdown = (data) => fetch.post(Api.UpdateTrainingStudentdown.url,
  { ...Api.UpdateTrainingStudentdown.data, ...data })

/**
 *  报名培训班
 */
export const UpdateTrainingStudentup = (data) => fetch.post(Api.UpdateTrainingStudentup.url,
  { ...Api.UpdateTrainingStudentup.data, ...data })

/**
 *  电子书
 */
export const GetBookInfoList = (data) => fetch.post(Api.GetBookInfoList.url,
  { ...Api.GetBookInfoList.data, ...data })

/**
 *  电子书章节
 */
export const GetBookChapterInfoList = (data) => fetch.post(Api.GetBookChapterInfoList.url,
  { ...Api.GetBookChapterInfoList.data, ...data })

/**
 *  电子书章节内容
 */
export const GetBookChapterContent = (data) => fetch.post(Api.GetBookChapterContent.url,
  { ...Api.GetBookChapterContent.data, ...data })

/**
 *  留言类型
 */
export const CommentType = (data) => fetch.post(Api.CommentType.url,
  { ...Api.CommentType.data, ...data })

/**
 *  添加留言
 */
export const AddMessage = (data) => fetch.post(Api.AddMessage.url,
  { ...Api.AddMessage.data, ...data })

/**
 *  修改用户信息
 */
export const UpdateUserInfo = (data) => fetch.post(Api.UpdateUserInfo.url,
  { ...Api.UpdateUserInfo.data, ...data })

/**
 *  获取职级列表
 */
export const GetGradeList = (data) => fetch.post(Api.GetGradeList.url,
  { ...Api.GetGradeList.data, ...data })

/**
 *  获取学历列表
 */
export const GetDegreeList = (data) => fetch.post(Api.GetDegreeList.url,
  { ...Api.GetDegreeList.data, ...data })

/**
 *  修改手机号
 */
export const UpdateMobile = (data) => fetch.post(Api.UpdateMobile.url,
  { ...Api.UpdateMobile.data, ...data })

/**
 *  发送验证码
 */
export const SendMsg = (data) => fetch.post(Api.SendMsg.url, { ...Api.SendMsg.data, ...data })

/**
 *  修改密码
 */
export const SetUserPassword = (data) => fetch.post(Api.SetUserPassword.url,
  { ...Api.SetUserPassword.data, ...data })

/**
 *  修改邮箱
 */
export const SetUserEmail = (data) => fetch.post(Api.SetUserEmail.url,
  { ...Api.SetUserEmail.data, ...data })

/**
 *  单位列表
 */
export const GetGroupList = (data) => fetch.post(Api.GetGroupList.url,
  { ...Api.GetGroupList.data, ...data })

/**
 *  注册
 */
export const Register = (data) => fetch.post(Api.Register.url, { ...Api.Register.data, ...data })

/**
 *  讨论列表
 */
export const DiscussList = (data) => fetch.post(Api.DiscussList.url,
  { ...Api.DiscussList.data, ...data })

/**
 *  添加讨论
 */
export const AddDiscuss = (data) => fetch.post(Api.AddDiscuss.url,
  { ...Api.AddDiscuss.data, ...data })

/**
 *  课程评论
 */
export const GetCourseCommentList = (data) => fetch.post(Api.GetCourseCommentList.url,
  { ...Api.GetCourseCommentList.data, ...data })

/**
 *  添加课程评论
 */
export const AddCourseComment = (data) => fetch.post(Api.AddCourseComment.url,
  { ...Api.AddCourseComment.data, ...data })

/**
 *  提交精品课程进度
 */
export const SyncUserStudyData = (data) => fetch.post(Api.SyncUserStudyData.url,
  { ...Api.SyncUserStudyData.data, ...data })

/**
 *  提交Mp4课程进度
 */
export const UploadTimeNode = (data) => fetch.post(Api.UploadTimeNode.url,
  { ...Api.UploadTimeNode.data, ...data })

/**
 *  相关课程
 */
export const RelatedCourse = (data) => fetch.post(Api.RelatedCourse.url,
  { ...Api.RelatedCourse.data, ...data })

/**
 *  成果展示分类
 */
export const GetProductionTypeInfoList = (data) => fetch.post(Api.GetProductionTypeInfoList.url,
  { ...Api.GetProductionTypeInfoList.data, ...data })

/**
 *  成果展示列表
 */
export const GetProductionInfoList = (data) => fetch.post(Api.GetProductionInfoList.url,
  { ...Api.GetProductionInfoList.data, ...data })

/**
 *  成果展示详情
 */
export const GetProductionInfo = (data) => fetch.post(Api.GetProductionInfo.url,
  { ...Api.GetProductionInfo.data, ...data })

/**
 *  学习档案
 */
export const GetUserRecordList = (data) => fetch.post(Api.GetUserRecordList.url,
  { ...Api.GetUserRecordList.data, ...data })

/**
 *  收藏列表
 */
export const GetCollectionList = (data) => fetch.post(Api.GetCollectionList.url,
  { ...Api.GetCollectionList.data, ...data })

/**
 *  添加收藏 Type 0：课程、1：文章、2：通知、3：电子 4：电子书章节收藏
 */
export const FavoriteAdd = (data) => fetch.post(Api.FavoriteAdd.url,
  { ...Api.FavoriteAdd.data, ...data })

/**
 *  删除收藏
 */
export const FavoriteDelete = (data) => fetch.post(Api.FavoriteDelete.url,
  { ...Api.FavoriteDelete.data, ...data })

/**
 *  考试记录
 */
export const GetPaperList = (data) => fetch.post(Api.GetPaperList.url,
  { ...Api.GetPaperList.data, ...data })

/**
 *  课程笔记列表
 */
export const GetExperience = (data) => fetch.post(Api.GetExperience.url,
  { ...Api.GetExperience.data, ...data })

/**
 *  添加课程笔记
 */
export const AddExperience = (data) => fetch.post(Api.AddExperience.url,
  { ...Api.AddExperience.data, ...data })

/**
 *  课程笔记详情
 */
export const GetExperienceById = (data) => fetch.post(Api.GetExperienceById.url,
  { ...Api.GetExperienceById.data, ...data })

/**
 *  获取收件箱，发件箱  0：收件、1：发件
 */
export const GetUserMessage = (data) => fetch.post(Api.GetUserMessage.url,
  { ...Api.GetUserMessage.data, ...data })

/**
 *  根据用户名查询用户
 */
export const GetUserByName = (data) => fetch.post(Api.GetUserByName.url,
  { ...Api.GetUserByName.data, ...data })

/**
 *  发送站内信
 */
export const AddUserMessage = (data) => fetch.post(Api.AddUserMessage.url,
  { ...Api.AddUserMessage.data, ...data })

/**
 *  站内信详情
 */
export const GetMessage = (data) => fetch.post(Api.GetMessage.url,
  { ...Api.GetMessage.data, ...data })

/**
 *  获取微信签名code
 */
export const Auth = (data) => fetch.post(Api.Auth.url, { ...Api.Auth.data, ...data })
/**
 *   会议人员列表 紧急任务人员列表
 */
export const UserList = (data) => fetch.post(Api.UserList.url, { ...Api.UserList.data, ...data })
/**
 *  点赞 0：文章 1：课程 2：电子书 3：学习圈 4：成果展示
 */
export const AddUserAiss = (data) => fetch.post(Api.AddUserAiss.url,
  { ...Api.AddUserAiss.data, ...data })
/**
 *  获取的未读消息数量
 */
export const GetMessageUnreadCount = (data) => fetch.get(Api.GetMessageUnreadCount.url,
  { ...Api.GetMessageUnreadCount.data, ...data })
/**
 * 通用 添加评论
 * 评论类型 PhotoWall-照片墙，Activity-志愿者活动，Article-新闻文章类等
 */
export const EnumCommentAdd = (data) => fetch.post(Api.EnumCommentAdd.url,
  { ...Api.EnumCommentAdd.data, ...data })
/**
 * 通用 评论列表
 * 评论类型 PhotoWall-照片墙，Activity-志愿者活动，Article-新闻文章类等
 */
export const EnumCommentList = (data) => fetch.post(Api.EnumCommentList.url,
  { ...Api.EnumCommentList.data, ...data })
/**
 * 通用 回复列表
 * 评论类型 PhotoWall-照片墙，Activity-志愿者活动，Article-新闻文章类等
 */
export const EnumCommentReplyList = (data) => fetch.post(Api.EnumCommentReplyList.url,
  { ...Api.EnumCommentReplyList.data, ...data })
/**
 * 通用 点赞
 *
 */
export const EnumThumbsUpCreate = (data) => fetch.post(Api.EnumThumbsUpCreate.url,
  { ...Api.EnumThumbsUpCreate.data, ...data })
/**
 * 通用 取消点赞
 */
export const EnumThumbsUpCancle = (data) => fetch.post(Api.EnumThumbsUpCancle.url,
  { ...Api.EnumThumbsUpCancle.data, ...data })
/**
 * 首页 公告
 */
export const NoticeList = (data) => fetch.post(Api.NoticeList.url,
  { ...Api.NoticeList.data, ...data })
/**
 * 首页 电子书列表
 */
export const BookList = (data) => fetch.post(Api.BookList.url,
  { ...Api.BookList.data, ...data })
/**
 * 课程列表
 */
export const CourseList = (data) => fetch.post(Api.CourseList.url,
  { ...Api.CourseList.data, ...data })
/**
 * 课程列表
 */
export const ProductionInfoList = (data) => fetch.post(Api.ProductionInfoList.url,
  { ...Api.ProductionInfoList.data, ...data })
/* 将所有的API封装起来 */
const allApi = {}
for (let key in Api) {
  if (Api[key].method === 'get') {
    if (key === 'GetNoticeInfoContent') {
      allApi[key] = (data) => fetch.get(Api[key].url + '/' + data.Id, { ...Api[key].data, ...data })
    } else {
      allApi[key] = (data) => fetch.get(Api[key].url, { ...Api[key].data, ...data })
    }
  } else if (Api[key].method === 'formData') {
    allApi[key] = (data, config) => fetch.postFormData(Api[key].url, data, config)
  } else {
    allApi[key] = (data) => fetch.post(Api[key].url, { ...Api[key].data, ...data })
  }
}
export default allApi
