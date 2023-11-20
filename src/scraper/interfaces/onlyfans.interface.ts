export type OFViewType = 's' | 'r' | 'a' | 'm' | 't';

export interface OFUserLink {
  id: number;
  _view: OFViewType;
}

export interface OFSource {
  source: string;
  width: number;
  height: number;
  size: number;
  duration: number;
}

export interface OFMedia {
  id: number;
  type: string | 'video';
  convertedToVideo: boolean;
  canView: boolean;
  hasError: boolean;
  createdAt: string;
  info: {
    source: OFSource;
    preview: {
      width: number;
      height: number;
      size: number;
    };
  };
  source: OFSource;
  squarePreview: string;
  full: string;
  preview: string;
  thumb: string;
  hasCustomPreview: boolean;
  files: {
    preview: {
      url: string;
    };
  };
  videoSources: {
    '720': string;
    '240': string;
  };
}

export interface OFPost {
  reponseType: 'post';
  id: number;
  postedAt: string;
  postedAtPrecise: string;
  expiredAt: string | null;
  author: OFUserLink;
  text: string;
  rawText: string;
  lockedText: boolean;
  isFavorite: boolean;
  canReport: boolean;
  canDelete: boolean;
  canComment: boolean;
  canEdit: boolean;
  isPinned: boolean;
  favoritesCount: number;
  mediaCount: number;
  isMediaReady: boolean;
  voting: unknown[];
  isOpened: boolean;
  canToggleFavorite: boolean;
  streamId: unknown | null;
  price: unknown | null;
  hasVoting: boolean;
  isAddedToBookmarks: boolean;
  isArchived: boolean;
  isPrivateArchive: boolean;
  isDeleted: boolean;
  hasUrl: boolean;
  isCouplePeopleMedia: boolean;
  cantCommentReason: string | null;
  commentsCount: number;
  mentionedUsers?: OFUserLink[];
  linkedUsers?: OFUserLink[];
  linkedPosts?: unknown[];
  media?: OFMedia[];
}

export interface OFPostList {
  list: OFPost[];
}

export interface OFBalances {
  payoutAvailable: number;
  payoutPending: number;
  currency: string;
  minPayoutSum: number;
  maxPayoutSum: number;
  withdrawalPeriodOptions: {
    code: 'manual' | 'weekly' | 'monthly';
    name: string;
  }[];
}

export interface OFTransaction {
  amount: number;
  vatAmount: number;
  net: number;
  fee: number;
  createdAt: string;
  currency: string;
  description: string;
  status: 'done' | 'pending' | string;
  user: {
    view: OFViewType;
    id: number;
    name: string;
    username: string;
    isVerified: boolean;
    avatar: string | null;
    avatarThumbs: null;
  };
  card: {
    last4: string;
    brand: 'Visa' | string;
  };
  id: string;
}

export interface OFTransactionsList {
  list: OFTransaction[];
  marker: number;
  hasMore: boolean;
  nextMarker: number;
}
