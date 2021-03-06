/**
 * 页面接口api
 */
// const API_URL = 'http://115.238.238.242:8099/api';
const API_URL = '/api'
const Platform = '/Wechat'
const Platform1 = '/mobile'
const Enum = '/AppEnum'
const Platform2 = '/wechatarticle'
const Book = '/wechatbook'
const Course = '/wechatCourse'
const Production = '/wechatproduction'
const Article = '/apiarticle'
const wechatTraining = '/wechatTraining' // zyb培训班
const wechatUser = '/wechatUser' // zyb收藏
const wechatother = '/wechatother' 
const wechatCommon = '/wechatCommon'
const wechatComment = '/wechatComment'
const wechatguid = '/wechatguid'
const wechatExam = '/wechatExam' // zyb考试
const wechatcircle = '/wechatcircle' // 学习圈
const WechatFile = '/WechatFile'

export default {
  // 判断用户是否存在
  CheckUserIsExit: {
    url: API_URL + Platform + '/CheckUserIsExit',
    data: { Account: '' }
  },
  // 判断用户在线状态
  CheckLoginStatus: {
    url: API_URL + Platform + '/CheckLoginStatus',
    data: { Mac: '' }
  },
  // 登陆微信
  Login: {
    url: API_URL + Platform + '/Login',
    data: { Code: '', Account: '', Password: '', Mac: '', CId: '' }
  },
  // 登陆2
  Login2: {
    url: API_URL + Platform1 + '/ValidateUser',
    data: { Account: '', Password: '', Mac: '', CId: '' }
  },
  GetLoginVC: {
    url: API_URL + wechatCommon + '/GetLoginVC',
    data: {}
  },
  // 获取用户信息
  GetUserInfo: {
    url: API_URL + Platform + '/GetUserInfo',
    data: {}
  },
  // 获取用户信息
  GetUserInfoById: {
    url: API_URL + Platform1 + '/GetUserInfoById',
    data: {}
  },
  // 轮播
  GetLink: {
    url: API_URL + Platform1 + '/GetLink',
    data: { Page: 1, Rows: 5 }
  },
  // 课程列表
  GetCourseInfoList: {
    url: API_URL + Platform + '/GetCourseInfoList',
    data: {
      TeacherName: '',
      ChannelId: '',
      Keyword: '',
      Sort: 'Id',
      Order: 'desc',
      Page: '1',
      Rows: '10'
    }
  },
  // 推荐课程
  RecommendCourse: {
    url: API_URL + Platform + '/RecommendCourse',
    data: {
      TeacherName: '',
      ChannelId: '',
      Keyword: '',
      Sort: 'Id',
      Order: 'desc',
      Page: '1',
      Rows: '4'
    }
  },
  // 课程分类
  GetChannelInfoList: {
    url: API_URL + Platform + '/GetChannelInfoList',
    data: { ParentId: 0 }
  },
  // 考试列表
  GetExamList: {
    url: API_URL + Platform + '/GetExamList',
    data: { ExamType: '', TypeId: '', Keyword: '', Page: '1', Rows: '10' }
  },
  // 获取考试题
  GetExam: {
    url: API_URL + Platform + '/GetExam',
    data: { Id: '' }
  },
  // 我的考试列表
  GetMyExamList: {
    url: API_URL + Platform + '/GetMyExamList',
    data: { Id: '' }
  },
  // 获取在线练习考试题
  GetExamPracticeList: {
    url: API_URL + Platform + '/GetExamPracticeList',
    data: { Id: '' }
  },
  // 提交考试题
  UpdateUserExam: {
    url: API_URL + Platform + '/UpdateUserExam',
    data: { ExamId: '', Data: null }
  },
  // 获取考试用户排行榜
  GetExamUserRank: {
    url: API_URL + Platform + '/GetExamUserRank',
    data: {}
  },
  // 退出登录
  LoginOut: {
    url: API_URL + Platform + '/LoginOut',
    data: { Mac: '' }
  },
  // 解除微信绑定
  DelBind: {
    url: API_URL + Platform + '/DelBind',
    data: {}
  },
  // 消息中心
  GetMessageCenter: {
    url: API_URL + Platform + '/GetMessageCenter',
    data: { Page: 1, Rows: 10, Keyword: '' }
  },
  // 通知内容
  GetNoticeInfoContent: {
    url: API_URL + Platform + '/GetNoticeInfoContent',
    data: {},
    method: 'get'
  },
  // 课程详情
  GetCourseDetail: {
    url: API_URL + Platform + '/GetCourseDetail',
    data: { Id: '' }
  },
  // 历史记录 Type => All:表示所有， Today:表示今天记录，Earlier:表示更早
  GetHistoryCourse: {
    url: API_URL + Platform + '/GetHistoryCourse',
    data: { Type: '', Keyword: '', Sort: 'sort', Order: 'desc', Page: 1, Rows: 20 }
  },
  // 用户课程列表 Finish => 1：完成课程，0：未完成课程 ,2：表示全部
  GetUserCourseInfoList: {
    url: API_URL + Platform + '/GetUserCourseInfoList',
    data: { Finish: '2', Keyword: '', Page: 1, Rows: 10 }
  },
  // 文章列表
  GetArticleInfoList: {
    url: API_URL + Platform2 + '/GetArticleInfoList',
    data: {}
  },
  // 文章详情
  ArticleDetail: {
    url: API_URL + Article + '/ArticleDetail',
    data: { Id: '' }
  },
  // 文章详情
  GetArticleDetailMore: {
    url: API_URL + Article + '/GetArticleDetailMore',
    data: { Id: '', CategoryId: '', Sort: 'Id', Order: 'desc' }
  },
  // 通知公告
  GetNoticeInfoList: {
    url: API_URL + Platform + '/GetNoticeInfoList',
    data: { Keyword: '', Page: '1', Rows: '10' }
  },
  // 排行榜 RankType => 1：学时， 2：课程，3：单位
  GetRankInfoList: {
    url: API_URL + Platform + '/GetRankInfoList',
    data: { RankType: '', TotalCount: '20' }
  },
  // 培训班分类
  GetTrainingTypeList: {
    url: API_URL + Platform + '/GetTrainingTypeList',
    data: {}
  },
  // 培训班列表 JoinStatus => Join：参加； UnJoin：未参加 ；UnAudit：审核中；
  GetTrainingClass: {
    url: API_URL + Platform + '/GetTrainingClass',
    data: { TypeId: '', TrainName: '', JoinStatus: '', Page: '1', Rows: '20' }
  },
  // 培训班详情
  GetTrainingDetail: {
    url: API_URL + Platform + '/GetTrainingDetail',
    data: { Id: '' }
  },
  // 签到列表
  GetClassUserSignList: {
    url: API_URL + Platform + '/GetClassUserSignList',
    data: { TrainingId: '', TodayFlag: '', Order: 'desc', Page: '1', Rows: '20' }
  },
  // 获取微信签名
  GetWechatWxAuthModel: {
    url: API_URL + Platform + '/GetWechatWxAuthModel',
    data: { Url: '' }
  },
  // 签到或签退
  TrainingSignIn: {
    url: API_URL + Platform + '/TrainingSignIn',
    data: { TrainingId: '', SignType: '', Longitude: '', Latitude: '', Position: '' }
  },
  // 取消报名培训班
  UpdateTrainingStudentdown: {
    url: API_URL + Platform + '/UpdateTrainingStudentdown',
    data: { Id: '' }
  },
  // 报名培训班
  UpdateTrainingStudentup: {
    url: API_URL + Platform + '/UpdateTrainingStudentup',
    data: { Id: '' }
  },
  // 电子书章节
  GetBookChapterInfoList: {
    url: API_URL + Platform + '/GetBookChapterInfoList',
    data: { BookId: '', Page: '1', Rows: '30' }
  },
  // 电子书章节内容
  GetBookChapterContent: {
    url: API_URL + Platform + '/GetBookChapterContent',
    data: { Id: '' }
  },
  // 留言类型
  CommentType: {
    url: API_URL + Platform + '/CommentType',
    data: {}
  },
  // 添加留言
  AddMessage: {
    url: API_URL + Platform + '/AddMessage',
    data: { MainId: '', ParentId: '', Title: '', Content: '', ClassCode: '' }
  },
  UpdateUserInfo: {
    url: API_URL + Platform + '/UpdateUserInfo',
    data: {}
  },
  // 获取职级列表
  GetGradeList: {
    url: API_URL + Platform + '/GetGradeList',
    data: {}
  },
  // 获取学历列表
  GetDegreeList: {
    url: API_URL + Platform + '/GetDegreeList',
    data: {}
  },
  // 修改手机号
  UpdateMobile: {
    url: API_URL + Platform + '/UpdateMobile',
    data: { OldMobile: '', NewMobile: '', SmgCode: '' }
  },
  // 发送验证码
  SendMsg: {
    url: API_URL + wechatother + '/SendMsgByPhone',
    data: { MobileNo: '' }
  },
  // 验证手机验证码
  CheckUserPhone: {
    url: API_URL + wechatother + '/CheckUserPhone',
    data: { }
  },
  // 修改密码
  SetUserPassword: {
    url: API_URL + Platform + '/SetUserPassword',
    data: { OldPassword: '', Password: '' }
  },
  // 修改密码
  SetUserEmail: {
    url: API_URL + Platform + '/SetUserEmail',
    data: { OldEmail: '', Email: '' }
  },
  // 单位列表
  GetGroupList: {
    url: API_URL + Platform + '/GetGroupList',
    data: { ParentId: '1' }
  },
  // 验证手机号码是否存在
  RegPhoneCheck: {
    url: API_URL + wechatUser + '/RegPhoneCheck',
    data: {}
  },
  // 注册
  Register: {
    url: API_URL + wechatUser + '/Register',
    data: {
      Account: '',
      Password: '',
      Name: '',
      GroupId: '',
      IdCard: '',
      Grade: '',
      Mobile: '',
      SmgCode: '',
      PortalId: 1
    }
  },
  // 讨论列表
  DiscussList: {
    url: API_URL + Platform + '/DiscussList',
    data: { MainId: '0', Sort: 'CreateDate', Order: 'desc', Page: '1', Rows: '10' }
  },
  // 添加讨论
  AddDiscuss: {
    url: API_URL + Platform + '/AddDiscuss',
    data: { MainId: '0', ParentId: '0', Content: '' }
  },
  // 课程评论
  GetCourseCommentList: {
    url: API_URL + wechatComment + '/CourseComment',
    data: { courseId: '', Page: '1', Rows: '10', Sort: 'Id', Order: 'desc' }
  },
  // 添加课程评论
  AddCourseComment: {
    url: API_URL + wechatComment + '/CourseCommentAdd',
    data: { }
  },
  // 提交精品课程进度
  SyncUserStudyData: {
    url: API_URL + Platform + '/SyncUserStudyData',
    data: { CourseId: '', Data: { NodeId: '', Time: '', Status: '' } }
  },
  // 提交Mp4课程进度
  UploadTimeNode: {
    url: API_URL + Platform + '/UploadTimeNode',
    data: { CourseId: '', TimeNode: '' }
  },
  // 相关课程
  RelatedCourse: {
    url: API_URL + wechatguid + '/RelatedCourse',
    data: { CourseId: '', Page: 1, Rows: 10 }
  },
  // 成果展示分类
  GetProductionTypeInfoList: {
    url: API_URL + Platform + '/GetProductionTypeInfoList',
    data: { ParentId: '', ParentCode: '' }
  },
  // 成果展示列表
  GetProductionInfoList: {
    url: API_URL + Platform + '/GetProductionInfoList',
    data: { CategoryId: '', CategoryCode: '0', Keyword: '', Page: 1, Rows: 10 }
  },
  // 成果展示详情
  GetProductionInfo: {
    url: API_URL + Platform + '/GetProductionInfo',
    data: { Id: '' }
  },
  // 学习档案
  GetUserRecordList: {
    url: API_URL + Platform + '/GetUserRecordList',
    data: { Page: 1, Rows: 10, OrderType: '1', OrderDesc: 'desc' }
  },
  // 收藏列表
  GetCollectionList: {
    url: API_URL + Platform + '/GetCollectionList',
    data: { startTime: '', endTime: '' }
  },
  // 添加收藏 Type 0：课程、1：文章、2：通知、3：电子 4：电子书章节收藏
  // FavoriteAdd: {
  //   url: API_URL + Platform + '/FavoriteAdd',
  //   data: { MainId: '', Type: '', Title: '' }
  // },
  // 删除收藏
  // FavoriteDelete: {
  //   url: API_URL + Platform + '/FavoriteDelete',
  //   data: { Id: '' }
  // },
  // 考试记录
  GetPaperList: {
    url: API_URL + Platform + '/GetPaperList',
    data: {}
  },
  // 课程笔记列表
  GetExperience: {
    url: API_URL + Platform + '/GetExperience',
    data: { CourseId: '' }
  },
  // 添加课程笔记
  AddExperience: {
    url: API_URL + Platform + '/AddExperience',
    data: { CourseId: '', ExperienceContent: '', ExperienceTitle: '' }
  },
  // 课程笔记详情
  GetExperienceById: {
    url: API_URL + Platform + '/GetExperienceById  ',
    data: { ExperienceId: '' }
  },
  // 获取收件箱，发件箱  0：收件、1：发件
  GetUserMessage: {
    url: API_URL + Platform + '/GetUserMessage',
    data: { MessageType: '' }
  },
  // 根据用户名查询用户
  GetUserByName: {
    url: API_URL + Platform + '/GetUserByName',
    data: { UserName: '' }
  },
  // 发送站内信
  AddUserMessage: {
    url: API_URL + Platform + '/AddUserMessage',
    data: { ToUser: '', MessageContent: '', MessageTitle: '' }
  },
  // 站内信详情
  GetMessage: {
    url: API_URL + Platform + '/GetMessage',
    data: { MessageId: '' }
  },
  // 获取微信签名code
  Auth: {
    url: API_URL + Platform + '/Auth',
    data: null
  },
  // 点赞 0：文章 1：课程 2：电子书 3：学习圈 4：成果展示
  AddUserAiss: {
    url: API_URL + Platform + '/AddUserAiss',
    data: { ObjId: '', ObjType: 4 }
  },
  // 获取未读消息数量
  GetMessageUnreadCount: {
    url: API_URL + Platform + '/GetMessageUnreadCount',
    data: {}
  },
  // 上传文件
  // UploadAttachment: {
  //   url: API_URL + '/AppFile/UploadAttachment',
  //   data: {},
  //   method: 'formData'
  // },
  // 通用评价添加
  EnumCommentAdd: {
    url: API_URL + Enum + '/CommentAdd',
    data: {}
  },
  // 通用评价列表
  EnumCommentList: {
    url: API_URL + Enum + '/CommentList',
    data: {}
  },
  // 通用回复列表
  EnumCommentReplyList: {
    url: API_URL + Enum + '/CommentReplyList',
    data: {}
  },
  // 通用点赞
  EnumThumbsUpCreate: {
    url: API_URL + Enum + '/ThumbsUpCreate',
    data: {}
  },
  // 通用取消点赞
  EnumThumbsUpCancle: {
    url: API_URL + Enum + '/ThumbsUpCancle',
    data: {}
  },
  // 首页通知公告
  NoticeList: {
    url: API_URL + Platform2 + '/NoticeList',
    data: {}
  },
  // 首页电子书列表
  BookList: {
    url: API_URL + Book + '/BookList',
    data: {}
  },
  // 电子书页面频道列表
  BookCategory: {
    url: API_URL + Book + '/BookCategory',
    data: {}
  },
  // 电子书章节列表
  BookChapterList: {
    url: API_URL + Book + '/BookChapterList',
    data: {}
  },
  // 电子书内容
  BookContent: {
    url: API_URL + Book + '/BookContent',
    data: {}
  },
  // 课程列表
  CourseList: {
    url: API_URL + Course + '/CourseList',
    data: {}
  },
  // 展厅列表
  ProductionInfoList: {
    url: API_URL + Production + '/ProductionInfoList',
    data: {}
  },
  TrainingClass: { // zyb培训班获取接口
    url: API_URL + wechatTraining + '/TrainingClass',
    data: {}
  },
  GetTrainingSchoolList: { // zyb获取培训学校列表接口
    url: API_URL + wechatTraining + '/GetTrainingSchoolList',
    data: {}
  },
  GetTrainingClassTypeList: { // zyb获取课程类型列表接口
    url: API_URL + wechatTraining + '/GetTrainingClassTypeList',
    data: {}
  },
  GetTrainingById: { // zyb获取培训班详情内容
    url: API_URL + wechatTraining + '/GetTrainingById',
    data: {}
  },
  TrainingSign: { // zyb培训班用户报名
    url: API_URL + wechatTraining + '/TrainingSign',
    data: {}
  },
  ArticleContent: { // zyb文章详情内容
    url: API_URL + Platform2 + '/ArticleContent',
    data: {}
  },
  GetArticleChannelInfoList: { // zyb获取文章类型
    url: API_URL + Platform2 + '/GetArticleChannelInfoList',
    data: {}
  },
  FavoriteAdd: { // zyb收藏添加 课程:Course,文章:Article,通知:Notice,电子书:Book,电子书章节:BookChapter,网上展厅:Production
    url: API_URL + wechatUser + '/FavoriteAdd',
    data: {}
  },
  FavoriteDelete: { // zyb删除添加 课程:Course,文章:Article,通知:Notice,电子书:Book,电子书章节:BookChapter,网上展厅:Production
    url: API_URL + wechatUser + '/FavoriteDelete',
    data: {}
  },
  FavoriteExist: { // zyb查看是否收藏 课程:Course,文章:Article,通知:Notice,电子书:Book,电子书章节:BookChapter,网上展厅:Production
    url: API_URL + wechatUser + '/FavoriteExist',
    data: {}
  },
  GetAllGroupList: {
    url: API_URL + wechatCommon + '/GetAllGroupList',
    data: {}
  },
  GetExamType: { // zyb获取考试类型
    url: API_URL + wechatExam + '/GetExamType',
    data: {}
  },
  ExamList: { // zyb获取考试列表
    url: API_URL + wechatExam + '/ExamList',
    data: {}
  },
  GetExamInfo: { // zyb获取考试内容
    url: API_URL + wechatExam + '/GetExamInfo',
    data: {}
  },
  PostExam: { // zyb考试结果上传
    url: API_URL + wechatExam + '/PostExam',
    data: {}
  },
  GetExamReviewInfo: { // zyb考试结果获取
    url: API_URL + wechatExam + '/GetExamReviewInfo',
    data: {}
  },
  CircleArticleList: { // 学习圈热门动态
    url: API_URL + wechatcircle + '/CircleArticleList',
    data: {}
  },
  AddUserAssist: { // 学习圈点赞
    url: API_URL + Platform2 + '/AddUserAssist',
    data: {}
  },
  DelUserAssist: { // 学习圈删除点赞
    url: API_URL + Platform2 + '/DelUserAssist',
    data: {}
  },
  CommentList: { // 学习圈评论列表
    url: API_URL + wechatComment + '/CommentList',
    data: {}
  },
  AddComment: { // 学习圈添加评论
    url: API_URL + wechatComment + '/AddComment',
    data: {}
  },
  CircleHotInfoList: { // 学习圈活跃圈子
    url: API_URL + wechatcircle + '/CircleHotInfoList',
    data: {}
  },
  UploadAttachment: { // 上传文件
    url: API_URL + WechatFile + '/UploadAttachment',
    data: {}
  },
  CircleCreate: { // 学习圈创建
    url: API_URL + wechatcircle + '/CircleCreate',
    data: {}
  },
  CircleArticleCreate: { // 学习圈文章发布
    url: API_URL + wechatcircle + '/CircleArticleCreate',
    data: {}
  },
  CircleDetail: { // 学习圈详情
    url: API_URL + wechatcircle + '/CircleDetail',
    data: {}
  },
  CircleTypeInfoList: { // 学习圈分类
    url: API_URL + wechatcircle + '/CircleTypeInfoList',
    data: {}
  },
  CircleInfoList: { // 学习圈列表
    url: API_URL + wechatcircle + '/CircleInfoList',
    data: {}
  }
}
