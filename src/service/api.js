/**
 * 页面接口api
 */
// const API_URL = 'http://115.238.238.242:8099/api';
const API_URL = '/api'
const Platform = '/Wechat'
const Platform1 = '/mobile'
const Enum = '/AppEnum'
const Platform2 = '/wechatarticle'
const appTraining = '/appTraining' // zyb培训班

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
  // 考试分类
  GetExamType: {
    url: API_URL + Platform + '/GetExamType',
    data: { ParentId: 0, ParentCode: '' }
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
  // 文章频道
  GetArticleChannelInfoList: {
    url: API_URL + Platform + '/GetArticleChannelInfoList',
    data: { ParentId: '', ParentCode: '' }
  },
  // 文章列表
  GetArticleInfoList: {
    url: API_URL + Platform + '/GetArticleInfoList',
    data: { CategoryId: '', Keyword: '', CategoryCode: '', Page: '1', Rows: '10' }
  },
  // 文章数
  GetActicleInfoCount: {
    url: API_URL + Platform1 + '/GetActicleInfoCount',
    data: { CategoryCode: '' }
  },
  // 文章详情
  ArticleDetail: {
    url: API_URL + Platform + '/ArticleDetail',
    data: { Id: '' }
  },
  // 文章详情
  GetArticleDetailMore: {
    url: API_URL + Platform + '/GetArticleDetailMore',
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
  // 电子书
  GetBookInfoList: {
    url: API_URL + Platform + '/GetBookInfoList',
    data: { Keyword: '', BookTypeId: '', BookTypeCode: '', Page: '1', Rows: '10' }
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
    url: API_URL + Platform + '/SendMsg',
    data: { MobileNo: '' }
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
  // 注册
  Register: {
    url: API_URL + Platform + '/Register',
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
    url: API_URL + Platform + '/getCourseCommentList',
    data: { courseId: '', Keyword: '', Page: '1', Rows: '10' }
  },
  // 添加课程评论
  AddCourseComment: {
    url: API_URL + Platform + '/AddCourseComment',
    data: { CourseId: '', Content: '', Score: '' }
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
    url: API_URL + Platform + '/RelatedCourse',
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
  FavoriteAdd: {
    url: API_URL + Platform + '/FavoriteAdd',
    data: { MainId: '', Type: '', Title: '' }
  },
  // 删除收藏
  FavoriteDelete: {
    url: API_URL + Platform + '/FavoriteDelete',
    data: { Id: '' }
  },
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
  UploadAttachment: {
    url: API_URL + '/AppFile/UploadAttachment',
    data: {},
    method: 'formData'
  },
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
  // 党史人物列表
  FigurePageList: {
    url: API_URL + Enum + '/FigurePageList',
    data: { Page: 1, Rows: 10, Sort: 'Id', Order: 'desc' }
  },
  // 党史人物详情
  GetFigureDetail: {
    url: API_URL + Enum + '/GetFigureDetail',
    data: { Id: '' }
  },
  // 党史人物诞辰纪念
  CheckFigureDate: {
    url: API_URL + Enum + '/CheckFigureDate',
    data: {}
  },
  // 入党纪念
  CheckPartyDate: {
    url: API_URL + Enum + '/CheckPartyDate',
    data: {}
  },
  NoticeList: {
    url: API_URL + Platform2 + '/NoticeList',
    data: {}
  },
  TrainingClass: { // zyb培训班获取接口
    url: API_URL + appTraining + '/TrainingClass',
    data: {}
  }
}
