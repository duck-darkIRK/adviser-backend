import { UserEntity } from './entities/user.entity';
import { MajorEntity } from './entities/major.entity';
import { TranscriptEntity } from './entities/transcript.entity';
import { ClassEntity } from './entities/class.entity';
import { SubjectEntity } from './entities/subject.entity';
import { NotificationEntity } from './entities/notification.entity';
import { MailEntity } from './entities/mail.entity';
import { PostEntity } from './entities/post.entity';
import { CommentEntity } from './entities/comment.entity';
import { TimetableEntity } from './entities/timetable.entity';
import { TimetableSheetEntity } from './entities/timetableSheet.entity';

// DTO imports for each module
import { CreateClassDto } from './dto/class/create-class.dto';
import { UpdateClassDto } from './dto/class/update-class.dto';
import { CreateCommentDto } from './dto/comment/create-comment.dto';
import { UpdateCommentDto } from './dto/comment/update-comment.dto';
import { CreateMailDto } from './dto/mail/create-mail.dto';
import { UpdateMailDto } from './dto/mail/update-mail.dto';
import { CreateMajorDto } from './dto/major/create-major.dto';
import { UpdateMajorDto } from './dto/major/update-major.dto';
import { CreateNotificationDto } from './dto/notification/create-notification.dto';
import { UpdateNotificationDto } from './dto/notification/update-notification.dto';
import { CreatePostDto } from './dto/post/create-post.dto';
import { UpdatePostDto } from './dto/post/update-post.dto';
import { CreateSubjectDto } from './dto/subject/create-subject.dto';
import { UpdateSubjectDto } from './dto/subject/update-subject.dto';
import { CreateTimetableDto } from './dto/timetable/create-timetable.dto';
import { UpdateTimetableDto } from './dto/timetable/update-timetable.dto';
import { CreateTimetableSheetDto } from './dto/timetablesheet/create-timetablesheet.dto';
import { UpdateTimetableSheetDto } from './dto/timetablesheet/update-timetablesheet.dto';
import { CreateTranscriptDto } from './dto/transcript/create-transcript.dto';
import { UpdateTranscriptDto } from './dto/transcript/update-transcript.dto';
import { CreateUserDto } from './dto/user/create-user.dto';
import { UpdateUserDto } from './dto/user/update-user.dto';

// Import the new models
import { User } from './model/user.model';
import { Mail } from './model/mail.model';
import { Notification } from './model/notification.model';
import { Post } from './model/post.model';
import { Comment } from './model/comment.model';
import { Timetable } from './model/timetable.model';
import { TimetableSheet } from './model/timetableSheet.model';
import { Transcript } from './model/transcript.model';
import { Subject } from './model/subject.model';
import { Class } from './model/class.model';
import { Major } from './model/major.model';

export {
    User,
    Major,
    Transcript,
    Class,
    Subject,
    Notification,
    Mail,
    Post,
    Comment,
    Timetable,
    TimetableSheet,
    UserEntity,
    MajorEntity,
    TranscriptEntity,
    ClassEntity,
    SubjectEntity,
    NotificationEntity,
    MailEntity,
    PostEntity,
    CommentEntity,
    TimetableEntity,
    TimetableSheetEntity,
    CreateClassDto,
    UpdateClassDto,
    CreateCommentDto,
    UpdateCommentDto,
    CreateMailDto,
    UpdateMailDto,
    CreateMajorDto,
    UpdateMajorDto,
    CreateNotificationDto,
    UpdateNotificationDto,
    CreatePostDto,
    UpdatePostDto,
    CreateSubjectDto,
    UpdateSubjectDto,
    CreateTimetableDto,
    UpdateTimetableDto,
    CreateTimetableSheetDto,
    UpdateTimetableSheetDto,
    CreateTranscriptDto,
    UpdateTranscriptDto,
    CreateUserDto,
    UpdateUserDto,
};
