/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GhostIcon, 
  BookIcon as LedgerIcon, 
  SendIcon, 
  CheckCircleIcon, 
  AlertCircleIcon, 
  PlusIcon,
  Trash2Icon,
  SkullIcon,
  ZapIcon,
  GhostIcon as MonsterIcon,
  SmileIcon,
  FrownIcon,
  HeartIcon,
  Share2Icon,
  ChevronLeftIcon,
  UsersIcon,
  HandshakeIcon,
  BriefcaseIcon,
  ThumbsUpIcon,
  SearchIcon,
  UserIcon,
  TrendingUpIcon,
  TrendingDownIcon,
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- SuperTroll Character (粗哥) ---
const SuperTroll = ({ state = 'idle', className }: { state?: 'idle' | 'flying' | 'happy' | 'sweating' | 'shocked' | 'calling', className?: string }) => {
  return (
    <div className={cn("relative w-64 h-64 flex items-center justify-center shrink-0", className)}>
      {state === 'happy' && (
        <>
          {/* Animated hearts */}
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 1], x: [-40, -60], y: [-20, -40] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute text-pink-400 text-2xl z-20"
          >
            ❤️
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.8], x: [40, 60], y: [-30, -50] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            className="absolute text-pink-400 text-xl z-20"
          >
            ❤️
          </motion.div>
        </>
      )}
      <svg width="100%" height="100%" viewBox="0 0 240 240" className="filter drop-shadow-xl">
        {/* Cape - The only colored part besides red text */}
        <motion.path 
          d="M40,120 Q10,140 20,220 L220,220 Q230,140 200,120 Z" 
          fill="#FF0000" stroke="black" strokeWidth="4"
          animate={state === 'flying' ? { scaleY: [1, 1.1, 1], y: [0, -5, 0] } : {}}
        />
        
        {/* Body - Black and White Line Art */}
        <motion.path 
          d="M80,120 Q120,100 160,120 L175,185 Q120,215 65,185 Z" 
          fill="white" stroke="black" strokeWidth="5"
          animate={state === 'flying' ? { y: [0, -10, 0] } : {}}
        />

        {/* Chest Symbol - Red Circle with "對" */}
        <circle cx="120" cy="165" r="22" fill="#FF0000" stroke="black" strokeWidth="3" />
        <text x="120" y="175" textAnchor="middle" className="font-sans font-black text-2xl fill-white">對</text>

        {/* Head */}
        <motion.circle 
          cx="120" cy="85" r="48" 
          fill="white" stroke="black" strokeWidth="5"
          animate={state === 'flying' ? { y: [0, -10, 0] } : {}}
        />

        {/* Face - "Hey, Bro!" Meme Style */}
        <g transform="translate(120, 85)">
          {/* Stubble (鬍渣) */}
          <g opacity="0.4">
            <circle cx="-15" cy="35" r="1" fill="black" />
            <circle cx="-5" cy="38" r="1" fill="black" />
            <circle cx="5" cy="38" r="1" fill="black" />
            <circle cx="15" cy="35" r="1" fill="black" />
            <circle cx="-20" cy="30" r="1" fill="black" />
            <circle cx="20" cy="30" r="1" fill="black" />
          </g>

          {state === 'happy' ? (
            <>
              {/* Eyes - looking up/sideways */}
              <g transform="translate(-18, -8)">
                <ellipse cx="0" cy="0" rx="7" ry="5" fill="white" stroke="black" strokeWidth="2" />
                <circle cx="3" cy="-1" r="2.5" fill="black" />
              </g>
              <g transform="translate(18, -8)">
                <ellipse cx="0" cy="0" rx="7" ry="5" fill="white" stroke="black" strokeWidth="2" />
                <circle cx="3" cy="-1" r="2.5" fill="black" />
              </g>
              {/* Mouth - satisfied smirk */}
              <path d="M-15,25 Q0,40 15,25" fill="none" stroke="black" strokeWidth="4" />
            </>
          ) : state === 'sweating' ? (
            <>
              <circle cx="-15" cy="0" r="4" fill="black" />
              <circle cx="15" cy="0" r="4" fill="black" />
              <path d="M-10,20 Q0,15 10,20" fill="none" stroke="black" strokeWidth="4" />
              <motion.path 
                d="M35,-30 Q40,-15 35,0" 
                fill="none" stroke="#60a5fa" strokeWidth="3"
                animate={{ y: [0, 25, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </>
          ) : state === 'shocked' ? (
            <>
              <circle cx="-20" cy="0" r="9" fill="black" />
              <circle cx="20" cy="0" r="9" fill="black" />
              <circle cx="0" cy="28" r="14" fill="none" stroke="black" strokeWidth="4" />
            </>
          ) : state === 'calling' ? (
            <>
              {/* Eyes - wide and excited */}
              <circle cx="-18" cy="0" r="8" fill="black" />
              <circle cx="18" cy="0" r="8" fill="black" />
              {/* Mouth - open shouting */}
              <ellipse cx="0" cy="25" rx="15" ry="10" fill="none" stroke="black" strokeWidth="4" />
            </>
          ) : (
            <>
              {/* Idle "Hey, Bro" Face - Tired/Unimpressed */}
              <path d="M-30,-20 Q-15,-25 -5,-20" fill="none" stroke="black" strokeWidth="3" />
              <path d="M5,-20 Q15,-25 30,-20" fill="none" stroke="black" strokeWidth="3" />
              <circle cx="-18" cy="0" r="6" fill="black" />
              <circle cx="18" cy="0" r="6" fill="black" />
              <path d="M-18,25 Q0,15 18,25" fill="none" stroke="black" strokeWidth="5" />
            </>
          )}
        </g>

        {/* Legs (Cross-legged) */}
        {state !== 'flying' && (
          <>
            <path d="M75,185 Q35,200 50,225 L110,225 Q120,210 105,190" fill="white" stroke="black" strokeWidth="4" />
            <path d="M165,185 Q205,200 190,225 L130,225 Q120,210 135,190" fill="white" stroke="black" strokeWidth="4" />
          </>
        )}

        {/* Arms */}
        <path d="M80,130 Q40,145 60,175" fill="none" stroke="black" strokeWidth="6" strokeLinecap="round" />
        {state === 'calling' ? (
          <motion.path 
            d="M160,130 Q220,80 200,40" 
            fill="none" stroke="black" strokeWidth="6" strokeLinecap="round"
            animate={{ rotate: [0, -10, 0], originX: '160px', originY: '130px' }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          />
        ) : (
          <path d="M160,130 Q200,145 180,175" fill="none" stroke="black" strokeWidth="6" strokeLinecap="round" />
        )}
      </svg>
    </div>
  );
};

const MonsterSpeechBubble = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div 
    initial={{ scale: 0.8, opacity: 0, y: 10 }} 
    animate={{ scale: 1, opacity: 1, y: 0 }} 
    className={cn(
      "relative p-6 bg-[#fffbeb] border-[4px] border-black rounded-[2.5rem] font-sans font-black text-xl text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
      "before:content-[''] before:absolute before:-top-4 before:left-1/2 before:-translate-x-1/2 before:w-20 before:h-8 before:bg-[#fffbeb] before:border-[4px] before:border-black before:rounded-t-xl before:border-b-0",
      className
    )}
  >
    {children}
  </motion.div>
);

// --- Types ---
interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  broId: string;
  friends: string[];
}

interface Transaction {
  id: string;
  name: string;
  item: string;
  amount: number;
  type: '借出' | '借入' | '個人收入' | '個人支出';
  status: 'active' | 'confirmed' | 'settled' | 'deleted';
  createdAt: string;
  deletedAt?: string;
  creatorName?: string;
  tag?: string;
  isPersonal?: boolean;
}

// --- Meme Style Components ---

const MemeCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("bg-background rough-border p-6", className)}>
    {children}
  </div>
);

const MemeButton = ({ 
  children, 
  onClick, 
  className, 
  variant = 'primary' 
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger'
}) => {
  const variants = {
    primary: "bg-background hover:opacity-90 text-foreground",
    secondary: "bg-foreground text-background hover:opacity-90",
    danger: "bg-destructive text-white hover:opacity-90",
  };

  return (
    <button 
      onClick={onClick}
      className={cn("meme-button font-black", variants[variant], className)}
    >
      {children}
    </button>
  );
};

const MemeInput = ({ 
  value, 
  onChange, 
  placeholder, 
  className,
  previewText 
}: { 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  placeholder?: string;
  className?: string;
  previewText?: string;
}) => (
  <div className="relative w-full">
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={cn(
        "w-full border-[4px] border-black px-6 py-6 text-3xl font-sans font-black bg-white focus:outline-none placeholder:text-gray-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl text-black",
        className
      )}
    />
    {previewText && (
      <div className="absolute -bottom-6 left-2 text-xs font-black text-black">
        {previewText}
      </div>
    )}
  </div>
);

import { QRCodeCanvas } from 'qrcode.react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, updateDoc, doc, onSnapshot, query, orderBy, deleteDoc, getDoc, getDocFromServer, where, setDoc, getDocs, limit } from 'firebase/firestore';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useTheme } from './ThemeContext';

// --- Firebase Setup ---
let db: any = null;
let auth: any = null;

const initFirebase = async () => {
  try {
    const response = await fetch('/firebase-applet-config.json');
    if (!response.ok) throw new Error('Config file not found');
    const firebaseConfig = await response.json();
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
    auth = getAuth(app);
    
    // Test connection
    try {
      await getDocFromServer(doc(db, 'test', 'connection'));
    } catch (error) {
      if(error instanceof Error && error.message.includes('the client is offline')) {
        console.error("Please check your Firebase configuration.");
      }
    }
    return { db, auth };
  } catch (e) {
    console.error("Firebase initialization failed:", e);
    return null;
  }
};

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid,
      email: auth?.currentUser?.email,
      emailVerified: auth?.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// --- Main App ---

function MainScreen({ initialPath }: { initialPath: '/' | '/recycle-bin' }) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [pathname, setPathname] = useState<'/' | '/recycle-bin'>(initialPath);
  const navigate = (path: '/' | '/recycle-bin') => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setPathname(path);
  };

  const [currentPage, setCurrentPage] = useState<'entry' | 'ledger' | 'friends' | 'confirm' | 'add-friend' | 'profile' | 'trash'>(initialPath === '/recycle-bin' ? 'trash' : 'entry');
  const [confirmTx, setConfirmTx] = useState<Transaction | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [inputText, setInputText] = useState('');
  const [groupTag, setGroupTag] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [isParseError, setIsParseError] = useState(false);
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ item: '', amount: 0 });
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [ledgerTab, setLedgerTab] = useState<'debts' | 'personal'>('debts');
  const [friendInput, setFriendInput] = useState('');
  const [friendSearchState, setFriendSearchState] = useState<'idle' | 'searching' | 'success' | 'error'>('idle');
  const [friendsProfiles, setFriendsProfiles] = useState<Record<string, UserProfile>>({});
  const [simplifiedDebts, setSimplifiedDebts] = useState<{from: string, to: string, amount: number, tag?: string}[]>([]);
  const [debouncedInputText, setDebouncedInputText] = useState('');
  const [pendingAction, setPendingAction] = useState<{
    txId: string;
    action: 'settle' | 'delete' | 'force-delete';
  } | null>(null);
  const [parsingPreview, setParsingPreview] = useState<{
    isPrivate: boolean;
    subject: string;
    amount: number;
    item: string;
    type: '借出' | '借入' | '個人收入' | '個人支出';
    display: string;
    trollState: 'idle' | 'happy' | 'sweating' | 'calling';
  } | null>(null);

  // Debounce inputText
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInputText(inputText);
    }, 300);
    return () => clearTimeout(timer);
  }, [inputText]);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname === '/recycle-bin' ? '/recycle-bin' : '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (pathname === '/recycle-bin') {
      setCurrentPage('trash');
      setSelectedFriend(null);
      return;
    }

    if (currentPage === 'trash') {
      setCurrentPage('ledger');
    }
  }, [pathname, currentPage]);

  // Initialize Auth
  useEffect(() => {
    initFirebase().then(res => {
      if (res) {
        setIsFirebaseReady(true);
        let unsubscribeProfile: (() => void) | undefined;
        
        const unsubscribeAuth = onAuthStateChanged(res.auth, async (user) => {
          setUser(user);
          if (unsubscribeProfile) {
            unsubscribeProfile();
          }
          
          if (user) {
            try {
              const userRef = doc(res.db, 'users', user.uid);
              let userSnap;
              try {
                userSnap = await getDoc(userRef);
              } catch (e) {
                handleFirestoreError(e, OperationType.GET, `users/${user.uid}`);
                return;
              }
              
              if (!userSnap.exists()) {
                // Generate a random 6-character alphanumeric ID
                const broId = Math.random().toString(36).substring(2, 8).toUpperCase();
                const newProfile: UserProfile = {
                  uid: user.uid,
                  displayName: user.displayName || null,
                  email: user.email || null,
                  photoURL: user.photoURL || null,
                  broId,
                  friends: []
                };
                try {
                  await setDoc(userRef, newProfile);
                } catch (e) {
                  handleFirestoreError(e, OperationType.WRITE, `users/${user.uid}`);
                  return;
                }
              }
              
              unsubscribeProfile = onSnapshot(userRef, (docSnap) => {
                if (docSnap.exists()) {
                  setUserProfile(docSnap.data() as UserProfile);
                }
              }, (error) => {
                handleFirestoreError(error, OperationType.GET, `users/${user.uid} (snapshot)`);
              });
              
            } catch (error) {
              handleFirestoreError(error, OperationType.GET, `users/${user.uid} (unknown)`);
            }
          } else {
            setUserProfile(null);
          }
        });
        return () => {
          unsubscribeAuth();
          if (unsubscribeProfile) unsubscribeProfile();
        };
      }
    });
  }, []);

  // Fetch friends profiles
  useEffect(() => {
    if (!isFirebaseReady || !userProfile || userProfile.friends.length === 0) {
      setFriendsProfiles({});
      return;
    }

    const fetchFriends = async () => {
      try {
        const newProfiles: Record<string, UserProfile> = {};
        // We can't easily use 'in' query if friends array is large, but for now we'll fetch them individually
        // or chunk them if needed. Let's fetch individually for simplicity.
        for (const friendUid of userProfile.friends) {
          const friendRef = doc(db, 'users', friendUid);
          const friendSnap = await getDoc(friendRef);
          if (friendSnap.exists()) {
            newProfiles[friendUid] = friendSnap.data() as UserProfile;
          }
        }
        setFriendsProfiles(newProfiles);
      } catch (error) {
        console.error("Error fetching friends", error);
        handleFirestoreError(error, OperationType.GET, 'users');
      }
    };

    fetchFriends();
  }, [isFirebaseReady, userProfile?.friends]);

  // Listen for transactions (both created by me and involving me)
  useEffect(() => {
    if (!isFirebaseReady || !user || !userProfile) {
      setTransactions([]);
      return;
    }

    const q1 = query(collection(db, 'transactions'), where('creatorUid', '==', user.uid));
    const q2 = query(collection(db, 'transactions'), where('name', 'in', [userProfile.broId, userProfile.displayName].filter(Boolean)));

    let txs1: Transaction[] = [];
    let txs2: Transaction[] = [];

    const mergeAndSet = () => {
      const allTxsMap = new Map<string, Transaction>();
      [...txs1, ...txs2].forEach(tx => allTxsMap.set(tx.id, tx));
      const allTxs = Array.from(allTxsMap.values());
      allTxs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setTransactions(allTxs);
    };

    const unsubscribe1 = onSnapshot(q1, (snapshot) => {
      txs1 = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
      mergeAndSet();
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'transactions (q1)');
    });

    const unsubscribe2 = onSnapshot(q2, (snapshot) => {
      txs2 = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
      mergeAndSet();
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'transactions (q2)');
    });

    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, [isFirebaseReady, user, userProfile?.broId, userProfile?.displayName]);

  // Debt Simplification Algorithm
  useEffect(() => {
    if (transactions.length === 0 || !userProfile) {
      setSimplifiedDebts([]);
      return;
    }

    // Group transactions by tag (or 'global' if no tag)
    const txsByTag: Record<string, Transaction[]> = {};
    transactions.forEach(tx => {
      if (tx.status === 'settled' || tx.isPersonal) return;
      const tag = tx.tag || '未分類';
      if (!txsByTag[tag]) txsByTag[tag] = [];
      txsByTag[tag].push(tx);
    });

    const allSimplified: {from: string, to: string, amount: number, tag?: string}[] = [];
    let hasComplexity = false;

    Object.entries(txsByTag).forEach(([tag, tagTxs]) => {
      const balances: Record<string, number> = {};
      const involvedPeople = new Set<string>();
      const directions = new Set<string>();

      tagTxs.forEach(tx => {
        const creditor = tx.type === '借出' ? (tx.creatorName || '未知') : tx.name;
        const debtor = tx.type === '借出' ? tx.name : (tx.creatorName || '未知');
        
        balances[creditor] = (balances[creditor] || 0) + tx.amount;
        balances[debtor] = (balances[debtor] || 0) - tx.amount;

        involvedPeople.add(creditor);
        involvedPeople.add(debtor);
        directions.add(`${debtor}->${creditor}`);
      });

      // Check if this group is "complex" enough to show simplification
      // 1. Involved people > 2
      // 2. Mutual debts (A->B and B->A)
      let isGroupComplex = false;
      if (involvedPeople.size > 2) {
        isGroupComplex = true;
      } else if (involvedPeople.size === 2) {
        const people = Array.from(involvedPeople);
        if (directions.has(`${people[0]}->${people[1]}`) && directions.has(`${people[1]}->${people[0]}`)) {
          isGroupComplex = true;
        }
      }

      if (isGroupComplex) hasComplexity = true;

      // Separate into debtors and creditors
      const debtors = Object.entries(balances)
        .filter(([, bal]) => bal < -0.01)
        .map(([name, bal]) => ({ name, balance: -bal }))
        .sort((a, b) => b.balance - a.balance);

      const creditors = Object.entries(balances)
        .filter(([, bal]) => bal > 0.01)
        .map(([name, bal]) => ({ name, balance: bal }))
        .sort((a, b) => b.balance - a.balance);

      let dIdx = 0;
      let cIdx = 0;

      while (dIdx < debtors.length && cIdx < creditors.length) {
        const debtor = debtors[dIdx];
        const creditor = creditors[cIdx];
        const amount = Math.min(debtor.balance, creditor.balance);

        if (amount > 0.01) {
          allSimplified.push({
            from: debtor.name,
            to: creditor.name,
            amount: Math.round(amount * 100) / 100,
            tag: tag === '未分類' ? undefined : tag
          });
        }

        debtor.balance -= amount;
        creditor.balance -= amount;

        if (debtor.balance <= 0.01) dIdx++;
        if (creditor.balance <= 0.01) cIdx++;
      }
    });

    // Only set simplified debts if there's actual complexity to show
    if (hasComplexity) {
      setSimplifiedDebts(allSimplified);
    } else {
      setSimplifiedDebts([]);
    }
  }, [transactions, userProfile]);

  // Handle Confirmation Link
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const confirmId = params.get('confirm');
    if (confirmId) {
      setCurrentPage('confirm');
      const fetchTx = async () => {
        try {
          const docRef = doc(db, 'transactions', confirmId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setConfirmTx({ id: docSnap.id, ...docSnap.data() } as Transaction);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `transactions/${confirmId}`);
        }
      };
      fetchTx();
    }
  }, []);

  const handleAddFriend = async () => {
    if (!friendInput.trim() || !user || !userProfile) return;
    setFriendSearchState('searching');
    setAiMessage(null);
    
    try {
      const q = query(collection(db, 'users'), where('broId', '==', friendInput.trim().toUpperCase()), limit(1));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const friendDoc = querySnapshot.docs[0];
        const friendData = friendDoc.data() as UserProfile;
        
        if (friendData.uid === user.uid) {
          setFriendSearchState('error');
          setAiMessage(`吼！加自己幹嘛啦！(╬ಠ益ಠ)`);
        } else if (userProfile.friends.includes(friendData.uid)) {
          setFriendSearchState('error');
          setAiMessage(`厚！你們已經是好友了啦！❤️`);
        } else {
          // Add to friends list
          const userRef = doc(db, 'users', user.uid);
          try {
            await updateDoc(userRef, {
              friends: [...userProfile.friends, friendData.uid]
            });
            
            setFriendSearchState('success');
            setAiMessage(`厚！成功加入 ${friendData.displayName || friendData.broId} 為好友！OK啦！❤️`);
            setFriendInput('');
          } catch (e) {
            handleFirestoreError(e, OperationType.WRITE, `users/${user.uid}`);
          }
        }
      } else {
        setFriendSearchState('error');
        setAiMessage(`吼！找不到這個 ID 啦！快餵我正確 ID！(╬ಠ益ಠ)`);
      }
    } catch (error) {
      console.error(error);
      setFriendSearchState('error');
      setAiMessage(`吼！系統出錯啦！(╬ಠ益ಠ)`);
      handleFirestoreError(error, OperationType.GET, 'users');
    }

    setTimeout(() => {
      setFriendSearchState('idle');
      setAiMessage(null);
    }, 5000);
  };

  const getMonthlyStats = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const monthlyPersonal = transactions.filter(t => 
      t.isPersonal && new Date(t.createdAt) >= startOfMonth && t.status !== 'deleted'
    );

    const income = monthlyPersonal
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = monthlyPersonal
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return { income, expense, total: income - expense };
  };

  const stats = getMonthlyStats();

  const getFriendCredit = (friendName: string) => {
    const friendTxs = transactions.filter(t => t.name === friendName && t.status !== 'settled');
    if (friendTxs.length === 0) return { rank: '夯', label: '粗哥認證', color: 'text-red-600', icon: 'happy', msg: `這兄弟，夠意思！` };
    
    const maxDaysOverdue = Math.max(...friendTxs.map(t => {
      const created = new Date(t.createdAt);
      const now = new Date();
      return Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    }));

    if (maxDaysOverdue <= 1) return { rank: '夯', label: '粗哥認證', color: 'text-red-600', icon: 'happy', msg: `這兄弟，夠意思！` };
    if (maxDaysOverdue <= 4) return { rank: '顶级', label: '普通', color: 'text-orange-500', icon: 'idle', msg: `喂... 錢還沒進來喔？` };
    if (maxDaysOverdue <= 7) return { rank: '人上人', label: '危險', color: 'text-yellow-500', icon: 'sweating', msg: `粗哥出動討債中... 跑去哪了！` };
    if (maxDaysOverdue <= 14) return { rank: 'NPC', label: '危險', color: 'text-yellow-800', icon: 'shocked', msg: `你是在跟我開玩笑嗎？！(╬ಠ益ಠ)` };
    return { rank: '拉完了', label: '黑名單', color: 'text-gray-600', icon: 'shocked', msg: `沒救了... 粗哥放棄。` };
  };
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handleParse = async () => {
    if (!inputText.trim()) return;
    setIsParsing(true);
    setAiMessage(null);
    setIsParseError(false);

    try {
      if (!db || !user) {
        setAiMessage("先登入啦，小丑！ (╯°□°）╯︵ ┻━┻");
        setIsParseError(true);
        setIsParsing(false);
        return;
      }

      if (parsingPreview) {
        if (selectedFriends.length > 0 && !parsingPreview.isPrivate) {
          const splitAmount = Math.round(parsingPreview.amount / selectedFriends.length);
          const promises = selectedFriends.map(friendName => 
            addDoc(collection(db, 'transactions'), {
              name: friendName,
              item: parsingPreview.item,
              amount: splitAmount,
              type: parsingPreview.type === '借入' ? '借入' : '借出',
              status: 'active',
              createdAt: new Date().toISOString(),
              creatorUid: user.uid,
              creatorName: user.displayName || null,
              tag: groupTag,
              isPersonal: false
            }).catch(e => handleFirestoreError(e, OperationType.CREATE, 'transactions'))
          );
          await Promise.all(promises);
          setAiMessage(`成功！已幫你平分給 ${selectedFriends.length} 人，每人 $${splitAmount}！ (๑•̀ㅂ•́)و✧`);
        } else {
          try {
            await addDoc(collection(db, 'transactions'), {
              name: parsingPreview.isPrivate ? '' : parsingPreview.subject,
              item: parsingPreview.item,
              amount: parsingPreview.amount,
              type: parsingPreview.type,
              status: 'active',
              createdAt: new Date().toISOString(),
              creatorUid: user.uid,
              creatorName: user.displayName || null,
              tag: groupTag,
              isPersonal: parsingPreview.isPrivate
            });
          } catch (e) {
            handleFirestoreError(e, OperationType.CREATE, 'transactions');
          }
          
          if (parsingPreview.isPrivate) {
            setAiMessage(`已記在自己帳上：${parsingPreview.item} $${parsingPreview.amount}！ (๑•̀ㅂ•́)و✧`);
          } else {
            setAiMessage(`解析成功！${user.displayName || '主人'} 餵了我 ${parsingPreview.subject} ${parsingPreview.amount} 元，OK啦！ (๑•̀ㅂ•́)و✧`);
          }
        }
      } else {
        // AI Fallback
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Parse this debt or personal expense record: "${inputText}". 
          
          CRITICAL INSTRUCTIONS:
          - isPersonal (個人私帳): true if the record is a personal expense/income (no specific person mentioned as debtor/creditor), false if it involves another person.
          - name (對象): If isPersonal is false, identify the person (e.g., "小明", "大家"). If isPersonal is true, set this to "".
          - amount (金額): Identify the number. If isPersonal is true and it's an expense, use a negative number. If it's income, use a positive number.
          - item (項目): The description (e.g., "晚餐", "地瓜球").
          - type (類型): "借出" (Lend/Expense) or "借入" (Borrow/Income). 
          
          Return JSON format: { "name": string, "item": string, "amount": number, "type": "借出" | "借入", "isPersonal": boolean }.`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                item: { type: Type.STRING },
                amount: { type: Type.NUMBER },
                type: { type: Type.STRING, enum: ["借出", "借入"] },
                isPersonal: { type: Type.BOOLEAN }
              },
              required: ["name", "item", "amount", "type", "isPersonal"]
            }
          }
        });

        let data;
        try {
          const text = response.text;
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          data = JSON.parse(jsonMatch ? jsonMatch[0] : text);
        } catch (e) {
          console.error("JSON Parse Error:", e, response.text);
          throw new Error("AI 返回格式錯誤");
        }
        
        if (selectedFriends.length > 0 && !data.isPersonal) {
          const splitAmount = Math.round(data.amount / selectedFriends.length);
          const promises = selectedFriends.map(friendName => 
            addDoc(collection(db, 'transactions'), {
              name: friendName,
              item: data.item,
              amount: splitAmount,
              type: data.type,
              status: 'active',
              createdAt: new Date().toISOString(),
              creatorUid: user.uid,
              creatorName: user.displayName || null,
              tag: groupTag,
              isPersonal: false
            }).catch(e => handleFirestoreError(e, OperationType.CREATE, 'transactions'))
          );
          await Promise.all(promises);
          setAiMessage(`成功！已幫你平分給 ${selectedFriends.length} 人，每人 $${splitAmount}！ (๑•̀ㅂ•́)و✧`);
        } else {
          try {
            let finalType = data.type;
            let finalAmount = data.amount;
            if (data.isPersonal) {
              if (data.type === '借出') {
                finalAmount = -Math.abs(data.amount);
                finalType = '個人支出';
              } else {
                finalAmount = Math.abs(data.amount);
                finalType = '個人收入';
              }
            }

            await addDoc(collection(db, 'transactions'), {
              name: data.isPersonal ? '' : data.name,
              item: data.item,
              amount: finalAmount,
              type: finalType,
              status: 'active',
              createdAt: new Date().toISOString(),
              creatorUid: user.uid,
              creatorName: user.displayName || null,
              tag: groupTag,
              isPersonal: data.isPersonal
            });
          } catch (e) {
            handleFirestoreError(e, OperationType.CREATE, 'transactions');
          }
          
          if (data.isPersonal) {
            setAiMessage(`已記在自己帳上：${data.item} $${data.amount}！ (๑•̀ㅂ•́)و✧`);
          } else {
            setAiMessage(`解析成功！${user.displayName || '主人'} 餵了我 ${data.name} ${data.amount} 元，OK啦！ (๑•̀ㅂ•́)و✧`);
          }
        }
      }

      setInputText('');
      setGroupTag('');
      setSelectedFriends([]);
      setTimeout(() => setAiMessage(null), 5000);
    } catch (error) {
      console.error("Accounting Error:", error);
      const errorMsg = error instanceof Error ? error.message : String(error);
      if (errorMsg.includes("Missing or insufficient permissions") || errorMsg.includes("permission-denied")) {
        setAiMessage(`吼！權限不足啦！(╬ಠ益ಠ)`);
      } else if (errorMsg.includes("AI 返回格式錯誤")) {
        setAiMessage(`吼！怪獸聽不懂「${inputText}」啦！快餵我：'小明 晚餐 200'`);
      } else if (errorMsg.includes("Quota exceeded")) {
        setAiMessage(`吼！額度用完了啦！明天再來。(╯°□°）╯︵ ┻━┻`);
      } else {
        setAiMessage(`吼！出錯了：${errorMsg.substring(0, 30)}...`);
      }
      setIsParseError(true);
    } finally {
      setIsParsing(false);
    }
  };

  // Omni-Semantic Input Parsing (Debounced)
  useEffect(() => {
    if (!debouncedInputText.trim()) {
      setParsingPreview(null);
      return;
    }

    const friendNames = Object.values(friendsProfiles).map(p => p.displayName || p.broId);
    if (userProfile?.friends) {
      userProfile.friends.forEach(f => {
        if (!friendNames.includes(f)) friendNames.push(f);
      });
    }

    // Strict Subject Identification
    const keywords = [...friendNames, '大家'];
    const parts = debouncedInputText.trim().split(/\s+/);
    const firstWord = parts[0];
    
    let isPrivate = true;
    let subject = '';
    let remainingParts = [...parts];

    if (keywords.includes(firstWord)) {
      isPrivate = false;
      subject = firstWord;
      remainingParts.shift();
    }

    // Find amount (number with optional + or -)
    let amount = 0;
    let hasPlus = false;
    let hasMinus = false;
    let amountIndex = -1;

    for (let i = 0; i < remainingParts.length; i++) {
      const part = remainingParts[i];
      const match = part.match(/^([+-]?)(\d+)/);
      if (match) {
        amount = parseInt(match[2]);
        hasPlus = match[1] === '+';
        hasMinus = match[1] === '-';
        amountIndex = i;
        break;
      }
    }

    if (amountIndex === -1) {
      setParsingPreview(null);
      return;
    }

    const item = remainingParts.filter((_, i) => i !== amountIndex).join(' ') || '未分類';

    let type: '借出' | '借入' | '個人收入' | '個人支出' = '個人支出';
    let display = '';
    let trollState: 'idle' | 'happy' | 'sweating' | 'calling' = 'idle';

      if (isPrivate) {
        if (hasPlus) {
          type = '個人收入';
          amount = Math.abs(amount);
          display = `記在自己帳上 (+收入)`;
          trollState = 'happy';
        } else {
          type = '個人支出';
          amount = -Math.abs(amount);
          display = `記在自己帳上 (-支出)`;
          trollState = 'idle';
        }
      } else {
        if (hasPlus) {
          type = '借入';
          display = `我欠 ${subject} 錢 ($${amount})`;
          trollState = 'sweating';
        } else {
          type = '借出';
          display = `向 ${subject} 討債 ($${amount})`;
          trollState = 'calling';
        }
      }

      setParsingPreview({ isPrivate, subject, amount, item, type, display, trollState });
    }, [debouncedInputText, friendsProfiles, userProfile]);

  const toggleStatus = async (id: string) => {
    const tx = transactions.find(t => t.id === id);
    if (tx) {
      // If it's confirmed, clicking the button now means "Settle"
      if (tx.status === 'confirmed') {
        setPendingAction({ txId: id, action: 'settle' });
        return;
      }
      try {
        await updateDoc(doc(db, 'transactions', id), {
          status: tx.status === 'active' ? 'confirmed' : 'active'
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `transactions/${id}`);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await updateDoc(doc(db, 'transactions', id), {
        status: 'deleted',
        deletedAt: new Date().toISOString()
      });
      setAiMessage("已移至回收桶！( ͡° ͜ʖ ͡°)");
      setTimeout(() => setAiMessage(null), 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `transactions/${id}`);
    }
  };

  const handleConfirmAction = async () => {
    if (!pendingAction) return;
    const { txId, action } = pendingAction;
    try {
      if (action === 'force-delete') {
        await deleteDoc(doc(db, 'transactions', txId));
        setAiMessage("徹底消失了！(╬ಠ益ಠ)");
      } else if (action === 'settle') {
        await updateDoc(doc(db, 'transactions', txId), {
          status: 'settled',
          deletedAt: new Date().toISOString()
        });
        setAiMessage("結清成功！已移至回收桶。(๑•̀ㅂ•́)و✧");
      }
      setTimeout(() => setAiMessage(null), 3000);
      setSelectedTx(null);
    } catch (error) {
      handleFirestoreError(error, action === 'force-delete' ? OperationType.DELETE : OperationType.UPDATE, `transactions/${txId}`);
    } finally {
      setPendingAction(null);
    }
  };

  const restoreTx = async (id: string) => {
    try {
      await updateDoc(doc(db, 'transactions', id), {
        status: 'active'
      });
      setAiMessage("已還原至帳本！ᕕ( ᐛ )ᕗ");
      setCurrentPage('ledger');
      setTimeout(() => setAiMessage(null), 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `transactions/${id}`);
    }
  };

  const permanentDeleteTx = (id: string) => {
    setPendingAction({ txId: id, action: 'force-delete' });
  };

  const handleEditTx = async () => {
    if (!selectedTx) return;
    try {
      await updateDoc(doc(db, 'transactions', selectedTx.id), {
        item: editData.item,
        amount: editData.amount
      });
      setIsEditing(false);
      setSelectedTx({ ...selectedTx, item: editData.item, amount: editData.amount });
      setAiMessage("修改成功！(๑•̀ㅂ•́)و✧");
      setTimeout(() => setAiMessage(null), 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `transactions/${selectedTx.id}`);
    }
  };

  const confirmTransaction = async () => {
    if (confirmTx) {
      try {
        await updateDoc(doc(db, 'transactions', confirmTx.id), {
          status: 'confirmed'
        });
        setConfirmTx({ ...confirmTx, status: 'confirmed' });
        setAiMessage("承認了！丑萌感到滿意。( ͡° ͜ʖ ͡°)");
        setTimeout(() => setAiMessage(null), 5000);
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `transactions/${confirmTx.id}`);
      }
    }
  };

  const shareLink = (id: string) => {
    const url = `${window.location.origin}${window.location.pathname}?confirm=${id}`;
    navigator.clipboard.writeText(url);
    setAiMessage("連結已複製！去煩你的朋友吧。ᕕ( ᐛ )ᕗ");
    setTimeout(() => setAiMessage(null), 3000);
  };

  const generateReminder = async (tx: Transaction) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = isPro 
        ? `Generate a crazy, aggressive, but funny debt reminder for ${tx.name} who owes $${tx.amount} for ${tx.item}. 
           Tone: "Hey Bro! 粗哥 is watching you! Pay back or I'll haunt your dreams!" 
           Use Traditional Chinese and heavy Taiwanese slang (e.g., 麥拖啦, 緊還錢, 欠錢不還會衰). 
           Make it sound like a troll superhero.`
        : `Generate a warm but funny reminder for ${tx.name} who owes $${tx.amount} for ${tx.item}. 
           Tone: "Hey Bro! 粗哥 says: By the way... are you going to pay back?" 
           Use Traditional Chinese.`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      setAiMessage(`超人提醒：\n\n${response.text}`);
    } catch (error) {
      setAiMessage(`嘿 ${tx.name}！我的 $${tx.amount}（${tx.item}）在哪裡？！(╬ಠ益ಠ)`);
    }
    setTimeout(() => setAiMessage(null), 10000);
  };

  return (
    <div className="min-h-screen bg-white text-black border-black dark:bg-black dark:text-white dark:border-white flex justify-center items-center p-0 sm:p-6 font-sans">
      {/* Simulated Mobile Device Frame */}
      <div className="w-full max-w-[430px] h-screen sm:h-[880px] bg-background flex flex-col relative sm:rounded-[50px] sm:border-[12px] sm:border-foreground sm:shadow-[0_30px_60px_rgba(0,0,0,0.3)] overflow-hidden">
        
        {/* Header (Black background as per screenshot) */}
        <header className="w-full flex justify-between items-center py-6 px-8 bg-foreground text-background z-30 shrink-0">
          <h1 className="text-4xl font-black tracking-tight italic">欸 粗哥</h1>
          {!user && (
            <button 
              onClick={handleLogin}
              className="bg-background text-foreground px-4 py-1 font-black text-xs border-2 border-background hover:bg-foreground hover:text-background transition-all active:scale-95"
            >
              登入
            </button>
          )}
          {user && (
            <div className="w-8 h-8 rounded-full border-2 border-background overflow-hidden">
              <img src={user.photoURL || ''} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          )}
        </header>

        {/* Main Content Area (No Scroll) */}
        <main className="w-full flex-1 relative overflow-hidden bg-background flex flex-col">
          <div className="flex transition-transform duration-500 ease-out h-full" style={{ transform: `translateX(${currentPage === 'ledger' ? '0%' : currentPage === 'entry' ? '-100%' : currentPage === 'friends' ? '-200%' : currentPage === 'profile' ? '-300%' : '0%'})` }}>
            {/* Ledger Page */}
            <div className="w-full flex-shrink-0 px-6 py-8 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col pb-32"
              >
                {/* TabRow */}
                <div className="flex border-4 border-foreground mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                  <button 
                    onClick={() => setLedgerTab('debts')}
                    className={cn(
                      "flex-1 py-3 font-black text-sm transition-all",
                      ledgerTab === 'debts' ? "bg-foreground text-background" : "bg-background text-foreground hover:bg-muted"
                    )}
                  >
                    對外債務
                  </button>
                  <button 
                    onClick={() => setLedgerTab('personal')}
                    className={cn(
                      "flex-1 py-3 font-black text-sm transition-all border-l-4 border-foreground",
                      ledgerTab === 'personal' ? "bg-foreground text-background" : "bg-background text-foreground hover:bg-muted"
                    )}
                  >
                    個人私帳
                  </button>
                </div>

                {ledgerTab === 'personal' && (
                  <div className="mb-8 p-4 border-4 border-foreground bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] relative overflow-hidden">
                    <h3 className="text-xs font-black uppercase mb-2 opacity-60">本月收支統計</h3>
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-green-600">收入: +${stats.income}</p>
                        <p className="text-[10px] font-bold text-red-600">支出: -${stats.expense}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase opacity-40 leading-none">本月結餘</p>
                        <p className={cn(
                          "text-3xl font-black leading-none",
                          stats.total >= 0 ? "text-green-600" : "text-red-600"
                        )}>
                          {stats.total >= 0 ? '+' : ''}{stats.total}
                        </p>
                      </div>
                    </div>
                    
                    {/* SuperTroll Feedback on Ledger Page */}
                    <div className="absolute -bottom-4 -right-4 opacity-20 pointer-events-none">
                      <SuperTroll 
                        state={stats.expense > stats.income ? 'sweating' : stats.income > stats.expense ? 'happy' : 'idle'} 
                        className="w-32 h-32" 
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-sans font-black underline decoration-foreground decoration-4 underline-offset-8 text-foreground">
                    {ledgerTab === 'debts' ? '債務清單' : '私帳清單'}
                  </h2>
                  <button 
                    onClick={() => navigate('/recycle-bin')}
                    className="p-3 border-4 border-foreground bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all hover:bg-muted"
                    title="回收桶"
                  >
                    <Trash2Icon size={24} className="text-foreground" />
                  </button>
                </div>

                {(() => {
                  const filteredTxs = transactions.filter(t => {
                    const isTabMatch = ledgerTab === 'debts' ? !t.isPersonal : t.isPersonal;
                    const isActive = t.status !== 'settled' && t.status !== 'deleted';
                    return isTabMatch && isActive;
                  });

                  if (filteredTxs.length === 0) {
                    return (
                      <Card className="text-center py-12 border-dashed">
                        <SkullIcon size={48} className="mx-auto mb-2 text-slate-400" />
                        <p className="font-medium text-slate-600">目前沒有{ledgerTab === 'debts' ? '債務' : '帳項'}... 真是奇蹟。</p>
                      </Card>
                    );
                  }

                  return (
                    <div className="grid grid-cols-2 gap-4">
                      {filteredTxs.map((tx) => (
                        <div key={tx.id} className="relative bg-card p-3 border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-transform hover:-translate-y-1 overflow-hidden flex flex-col justify-between min-h-[180px]">
                          {/* Confirmed Stamp for Debts */}
                          {!tx.isPersonal && tx.status === 'confirmed' && (
                            <motion.div 
                              initial={{ scale: 2, opacity: 0, rotate: -20 }}
                              animate={{ scale: 1, opacity: 0.8, rotate: -15 }}
                              className="absolute top-1 right-1 z-20 pointer-events-none"
                            >
                              <div className="border-2 border-red-600 rounded-full p-1 flex flex-col items-center justify-center rotate-[-15deg] bg-background/80 scale-75">
                                <span className="text-red-600 font-black text-[8px] uppercase tracking-tighter">confirmed ✅</span>
                              </div>
                            </motion.div>
                          )}

                          {/* "夯" Label for Personal Income */}
                          {tx.isPersonal && tx.type === '個人收入' && (
                            <div className="absolute top-1 right-1 z-20">
                              <div className="bg-red-600 text-white font-black text-[10px] px-1 py-0.5 border border-foreground rotate-[15deg]">
                                夯
                              </div>
                            </div>
                          )}

                          <div 
                            className="space-y-2 cursor-pointer flex-1"
                            onClick={() => setSelectedTx(tx)}
                          >
                            <div className="flex items-center justify-between">
                              <span className={cn(
                                "text-[8px] font-black uppercase px-1 py-0.5 border border-foreground",
                                (tx.type === '借出' || tx.type === '個人收入' || (tx.isPersonal && tx.amount > 0)) ? "bg-green-400" : "bg-red-400"
                              )}>
                                {tx.type === '借出' ? 'LEND' : tx.type === '借入' ? 'BORROW' : tx.type === '個人收入' ? '收入' : '支出'}
                              </span>
                              <span className="text-[8px] font-black opacity-40">
                                {(() => {
                                  const d = new Date(tx.createdAt);
                                  return `${d.getMonth() + 1}/${d.getDate()}`;
                                })()}
                              </span>
                            </div>
                            
                            <div className="flex items-start gap-2">
                              {tx.isPersonal && tx.type === '個人支出' && (
                                <div className="mt-1 p-1 bg-foreground text-background rounded-sm">
                                  <TrendingDownIcon size={12} />
                                </div>
                              )}
                              {tx.isPersonal && tx.type === '個人收入' && (
                                <div className="mt-1 p-1 bg-foreground text-background rounded-sm">
                                  <TrendingUpIcon size={12} />
                                </div>
                              )}
                              <div className="flex-1 overflow-hidden">
                                <span className="text-[6px] font-bold opacity-40 uppercase block">{tx.isPersonal ? '項目' : '項目 / 對象'}</span>
                                <h3 className="text-lg font-black leading-tight truncate">{tx.item}</h3>
                                <p className="text-[10px] font-bold opacity-60 truncate">{tx.isPersonal ? '個人開銷' : tx.name}</p>
                              </div>
                            </div>

                            <div>
                              <span className="text-[6px] font-bold opacity-40 uppercase block">金額</span>
                              <p className={cn(
                                "text-2xl font-black leading-none",
                                (tx.type === '借出' || tx.type === '個人收入' || (tx.isPersonal && tx.amount > 0)) ? "text-green-600" : "text-red-600"
                              )}>
                                {tx.isPersonal ? (tx.amount > 0 ? '+' : '') : (tx.type === '個人支出' ? '-' : tx.type === '個人收入' ? '+' : '')}${tx.amount}
                              </p>
                            </div>
                          </div>

                          <div className="mt-2 pt-2 border-t border-foreground flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                              {!tx.isPersonal ? (
                                <button 
                                  onClick={() => toggleStatus(tx.id)}
                                  className={cn(
                                    "text-[8px] font-black px-2 py-1 border border-foreground transition-all active:scale-95 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]",
                                    tx.status === 'confirmed' ? "bg-green-400" : "bg-yellow-400"
                                  )}
                                >
                                  {tx.status === 'confirmed' ? '結清' : '討債'}
                                </button>
                              ) : (
                                <div className="text-[8px] font-black uppercase opacity-40">私帳紀錄</div>
                              )}
                              <div className="flex gap-1">
                                {!tx.isPersonal && (
                                  <button 
                                    onClick={() => shareLink(tx.id)}
                                    className="p-1 border border-foreground bg-background text-foreground hover:bg-foreground hover:text-background transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                                  >
                                    <Share2Icon size={12} />
                                  </button>
                                )}
                                <button 
                                  onClick={() => handleDelete(tx.id)}
                                  className="p-1 border border-foreground bg-red-400 hover:bg-red-500 text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                                >
                                  <Trash2Icon size={12} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </motion.div>
            </div>

            {/* Recycle Bin Page */}
            <div className={cn(
              "w-full flex-shrink-0 px-6 py-8 overflow-y-auto bg-gray-50",
              currentPage === 'trash' ? "block" : "hidden"
            )}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col pb-32"
              >
                <div className="flex items-center gap-4 mb-8">
                  <button 
                    onClick={() => navigate('/')}
                    className="p-2 border-4 border-foreground bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                  >
                    <ChevronLeftIcon size={24} className="text-foreground" />
                  </button>
                  <div className="flex flex-col">
                    <h2 className="text-3xl font-sans font-black underline decoration-foreground decoration-4 underline-offset-8 text-foreground">
                      回收桶 (NPC 墓園)
                    </h2>
                  </div>
                </div>

                {/* Tabs in Recycle Bin */}
                <div className="flex gap-4 mb-8">
                  <button 
                    onClick={() => setLedgerTab('debts')}
                    className={cn(
                      "flex-1 py-3 border-4 border-foreground font-black transition-all",
                      ledgerTab === 'debts' ? "bg-foreground text-background shadow-none" : "bg-background text-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                    )}
                  >
                    對外債務
                  </button>
                  <button 
                    onClick={() => setLedgerTab('personal')}
                    className={cn(
                      "flex-1 py-3 border-4 border-foreground font-black transition-all",
                      ledgerTab === 'personal' ? "bg-foreground text-background shadow-none" : "bg-background text-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                    )}
                  >
                    個人私帳
                  </button>
                </div>

                {(() => {
                  const trashTxs = transactions.filter(t => {
                    const isTabMatch = ledgerTab === 'debts' ? !t.isPersonal : t.isPersonal;
                    const isTrash = t.status === 'deleted';
                    
                    // Filter out items older than 14 days
                    if (isTrash && t.deletedAt) {
                      const deletedDate = new Date(t.deletedAt);
                      const now = new Date();
                      const diffDays = (now.getTime() - deletedDate.getTime()) / (1000 * 60 * 60 * 24);
                      if (diffDays > 14) return false;
                    }
                    
                    return isTabMatch && isTrash;
                  });
                  
                  if (trashTxs.length === 0) {
                    return (
                      <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <SuperTroll state="idle" className="w-48 h-48 opacity-20 grayscale" />
                        <p className="text-xl font-black text-muted-foreground italic">「這裡空蕩蕩的，看來大家都很夯。」</p>
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-1 gap-6">
                      {trashTxs.map((tx) => (
                        <div key={tx.id} className="bg-card p-4 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex flex-col gap-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className={cn(
                                "text-[10px] font-black px-1 border-2 border-foreground bg-red-400"
                              )}>
                                DELETED
                              </span>
                              <h3 className="text-xl font-black mt-1 text-foreground">{tx.item || '未命名項目'}</h3>
                              <p className="text-xs font-bold opacity-60 text-foreground">{tx.isPersonal ? '個人開銷' : tx.name} • ${tx.amount}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] font-bold opacity-40 text-foreground">
                                {new Date(tx.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 mt-2">
                            <button 
                              onClick={() => restoreTx(tx.id)}
                              className="flex-1 py-2 bg-background border-2 border-foreground font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 text-foreground"
                            >
                              還原 (Restore)
                            </button>
                            <button 
                              onClick={() => permanentDeleteTx(tx.id)}
                              className="flex-1 py-2 bg-red-400 text-white border-2 border-foreground font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
                            >
                              徹底刪除 (Force)
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </motion.div>
            </div>

            {/* Entry Page */}
            <div className="w-full flex-shrink-0 px-8 py-12 flex flex-col items-center justify-between h-full overflow-hidden">
              <div className="w-full space-y-6 flex flex-col items-center">
                <MemeInput 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="例：小明 晚餐 200"
                  previewText={parsingPreview?.display}
                />
                
                {/* Group Accounting UI */}
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-2">
                    <input 
                      type="text"
                      value={groupTag}
                      onChange={(e) => setGroupTag(e.target.value)}
                      placeholder="群組標籤 (如：中原夜市團)"
                      className="flex-1 border-2 border-foreground p-2 font-bold text-sm focus:outline-none bg-background text-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                    />
                  </div>

                  {/* LazyRow for Friends Multi-select */}
                  <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex gap-3 px-1">
                      {(() => {
                        const txNames = transactions.map(t => t.name);
                        const profileNames = Object.values(friendsProfiles).map(p => p.displayName || p.broId);
                        const allFriendNames = Array.from(new Set([...txNames, ...profileNames])).filter(Boolean);
                        
                        return allFriendNames.map(friendName => {
                          const isSelected = selectedFriends.includes(friendName);
                          const profile = Object.values(friendsProfiles).find(p => (p.displayName || p.broId) === friendName);
                          
                          return (
                            <motion.div
                              key={friendName}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                setSelectedFriends(prev => 
                                  prev.includes(friendName) 
                                    ? prev.filter(f => f !== friendName)
                                    : [...prev, friendName]
                                );
                              }}
                              className={cn(
                                "flex flex-col items-center gap-1 cursor-pointer transition-all",
                                isSelected ? "scale-110" : "opacity-60"
                              )}
                            >
                              <div className={cn(
                                "w-12 h-12 rounded-full border-4 flex items-center justify-center overflow-hidden bg-card",
                                isSelected ? "border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]" : "border-foreground"
                              )}>
                                {profile?.photoURL ? (
                                  <img src={profile.photoURL} alt={friendName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                ) : (
                                  <SuperTroll state="idle" className="w-16 h-16" />
                                )}
                              </div>
                              <span className="text-[10px] font-black truncate w-12 text-center text-foreground">{friendName}</span>
                            </motion.div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                </div>

                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={handleParse}
                  disabled={isParsing}
                  className="w-40 h-16 flex items-center justify-center bg-foreground text-background font-black text-3xl border-4 border-foreground rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] active:shadow-none transition-all"
                >
                  {isParsing ? "..." : "記帳！"}
                </motion.button>
              </div>

              <div className="flex flex-col items-center relative w-full">
                <AnimatePresence>
                  {aiMessage && (
                    <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-full max-w-xs z-10">
                      <MonsterSpeechBubble className="text-sm py-3 px-4 bg-card border-4 border-foreground text-foreground">
                        {aiMessage}
                      </MonsterSpeechBubble>
                    </div>
                  )}
                </AnimatePresence>
                
                <motion.div 
                  className="mb-2"
                  animate={isParsing ? { y: -50, opacity: 0.5 } : { y: 0, opacity: 1 }}
                >
                  <SuperTroll 
                    state={
                      isParsing ? 'flying' : 
                      isParseError ? 'shocked' : 
                      parsingPreview ? parsingPreview.trollState :
                      selectedFriends.length > 0 ? 'calling' : 
                      aiMessage ? 'happy' : 'idle'
                    } 
                    className="w-80 h-80" 
                  />
                </motion.div>

                <footer className="opacity-100 text-2xl font-black text-center mb-6 text-foreground">
                  © 2026 欸 粗哥 INC.
                </footer>
              </div>
            </div>

            {/* Friends Page */}
            <div className="w-full flex-shrink-0 px-6 py-8 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col pb-32"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-sans font-black underline decoration-foreground decoration-4 underline-offset-8">
                      欸 粗哥：社交圈
                    </h2>
                    <ThumbsUpIcon className="text-yellow-400 fill-yellow-400" size={32} />
                  </div>
                </div>

                {/* Add Friend Section - Moved to Top */}
                {!selectedFriend && (
                  <div className="mb-8 p-4 border-4 border-foreground bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                    <h3 className="text-lg font-black mb-2">添加新好友</h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={friendInput}
                        onChange={(e) => setFriendInput(e.target.value)}
                        placeholder="輸入好友 ID..."
                        className="flex-1 border-2 border-foreground bg-background p-2 font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                      <button
                        onClick={handleAddFriend}
                        disabled={friendSearchState === 'searching'}
                        className="bg-foreground text-background px-4 py-2 font-black active:translate-y-1 active:translate-x-1 transition-transform disabled:opacity-50"
                      >
                        {friendSearchState === 'searching' ? '搜尋中...' : '添加'}
                      </button>
                    </div>
                    {aiMessage && (
                      <p className={cn("mt-2 text-sm font-bold", friendSearchState === 'error' ? "text-red-500" : "text-green-600")}>
                        {aiMessage}
                      </p>
                    )}
                  </div>
                )}

                
                {/* Debt Simplification Section */}
                {simplifiedDebts.length > 0 && !selectedFriend && (
                  <div className="mb-8 p-4 border-4 border-foreground bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                    <div className="flex items-center gap-2 mb-4">
                      <ZapIcon className="text-yellow-500 fill-yellow-500" size={24} />
                      <h3 className="text-xl font-black italic">粗哥幫你算好了：最簡還款路徑</h3>
                    </div>
                    <div className="space-y-3">
                      {simplifiedDebts.map((debt, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-background border-2 border-foreground p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <span className="font-black truncate max-w-[100px]">{debt.from}</span>
                            <span className="font-black">➔</span>
                            <span className="font-black truncate max-w-[100px]">{debt.to}</span>
                          </div>
                          <div className="text-right shrink-0 ml-2">
                            <p className="text-lg font-black text-red-600">${debt.amount}</p>
                            {debt.tag && <p className="text-[8px] font-black opacity-40">#{debt.tag}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] font-bold mt-4 opacity-60 italic text-center">
                      「照著這樣還，轉帳次數最少啦！粗哥聰明吧？」
                    </p>
                  </div>
                )}
                
                {!selectedFriend ? (
                  <div className="space-y-4">
                    {(() => {
                      const txNames = transactions.map(t => t.name);
                      const profileNames = Object.values(friendsProfiles).map(p => p.displayName || p.broId);
                      const allFriendNames = Array.from(new Set([...txNames, ...profileNames])).filter(Boolean);
                      
                      if (allFriendNames.length === 0) {
                        return (
                          <div className="text-center py-12 border-4 border-black border-dashed opacity-30">
                            <UsersIcon size={48} className="mx-auto mb-2" />
                            <p className="font-black">還沒有好友紀錄...</p>
                          </div>
                        );
                      }
                      
                      return allFriendNames.map(friendName => {
                        const credit = getFriendCredit(friendName);
                        // Check if this friend is a registered user
                        const profile = Object.values(friendsProfiles).find(p => (p.displayName || p.broId) === friendName);
                        
                        return (
                          <motion.div 
                            key={friendName}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedFriend(friendName)}
                            className="bg-card border-4 border-foreground p-4 flex items-center gap-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] cursor-pointer"
                          >
                            <div className="w-16 h-16 rounded-full border-4 border-foreground bg-muted overflow-hidden flex items-center justify-center shrink-0">
                              {profile?.photoURL ? (
                                <img src={profile.photoURL} alt={friendName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              ) : (
                                <SuperTroll state="idle" className="w-24 h-24" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0 text-foreground">
                              <h3 className="text-xl font-black truncate">{friendName}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={cn("text-[10px] font-black px-2 py-0.5 border-2 border-foreground", credit.color)}>
                                  {credit.label}
                                </span>
                                {profile && (
                                  <span className="text-[10px] font-black px-2 py-0.5 border-2 border-foreground bg-yellow-300 text-black">
                                    已註冊粗哥
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-right text-foreground">
                              <p className="text-[10px] font-black opacity-40 uppercase">粗哥排名</p>
                              <p className="text-2xl font-black">{credit.rank}</p>
                            </div>
                          </motion.div>
                        );
                      });
                    })()}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <button 
                      onClick={() => setSelectedFriend(null)}
                      className="flex items-center gap-2 font-black text-sm hover:underline text-foreground"
                    >
                      <ChevronLeftIcon size={20} /> 返回好友列表
                    </button>

                    <div className="bg-foreground text-background p-6 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-20 h-20 rounded-full bg-background border-4 border-background overflow-hidden flex items-center justify-center">
                          {(() => {
                            const profile = Object.values(friendsProfiles).find(p => (p.displayName || p.broId) === selectedFriend);
                            if (profile?.photoURL) {
                              return <img src={profile.photoURL} alt={selectedFriend} className="w-full h-full object-cover" referrerPolicy="no-referrer" />;
                            }
                            return <SuperTroll state="happy" className="w-32 h-32" />;
                          })()}
                        </div>
                        <div>
                          <h3 className="text-3xl font-black italic">{selectedFriend}</h3>
                          <p className="text-xs font-bold opacity-60">粗哥認證好友</p>
                        </div>
                      </div>
                      
                      <div className="bg-background text-foreground p-4 border-2 border-background">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-black text-sm">粗哥信用報告 (AI)</span>
                          <span className={cn("text-xs font-black px-2 py-1 border-2 border-foreground", getFriendCredit(selectedFriend).color)}>
                            {getFriendCredit(selectedFriend).label}
                          </span>
                        </div>
                        <p className="text-xs font-bold leading-relaxed italic">
                          "{getFriendCredit(selectedFriend).msg}"
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl font-black border-b-4 border-foreground pb-2 text-foreground">往來帳務</h4>
                      {transactions.filter(t => t.name === selectedFriend).map(tx => (
                        <div key={tx.id} className="bg-card p-3 border-2 border-foreground flex justify-between items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] text-foreground">
                          <div>
                            <p className="text-[10px] font-black opacity-40">{new Date(tx.createdAt).toLocaleDateString()}</p>
                            <p className="font-black">{tx.item}</p>
                          </div>
                          <div className="text-right">
                            <p className={cn("text-lg font-black", tx.type === '借出' ? "text-green-600" : "text-red-600")}>
                              {tx.type === '借出' ? '+' : '-'}${tx.amount}
                            </p>
                            <p className="text-[8px] font-black opacity-40">{tx.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Profile Page */}
            <div className="w-full flex-shrink-0 px-6 py-8 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col pb-32"
              >
                <h2 className="text-3xl font-sans font-black underline decoration-foreground decoration-4 underline-offset-8 mb-8">
                  個人中心
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-card border-4 border-foreground p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
                    <h3 className="text-xl font-black mb-4">帳號設定</h3>
                    {user ? (
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center font-black text-2xl">
                            {user.displayName?.[0] || 'U'}
                          </div>
                          <div>
                            <p className="font-black">{user.displayName}</p>
                            <p className="text-xs opacity-60">{user.email}</p>
                          </div>
                        </div>
                        {userProfile && (
                          <div className="mt-4 p-4 border-4 border-foreground bg-yellow-100 dark:bg-yellow-900/30 flex flex-col items-center gap-4 text-foreground">
                            <p className="font-black text-lg">你的粗哥 ID</p>
                            <p className="text-3xl font-mono font-black tracking-widest">{userProfile.broId}</p>
                            <div className="p-2 bg-white border-4 border-black">
                              <QRCodeCanvas value={userProfile.broId} size={128} />
                            </div>
                            <p className="text-xs font-black text-center">讓朋友掃描或輸入 ID 加你好友！</p>
                          </div>
                        )}
                        <button 
                          onClick={handleLogout}
                          className="w-full mt-4 py-3 bg-red-500 text-white font-black text-lg border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                        >
                          登出
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={handleLogin}
                        className="w-full py-4 bg-foreground text-background font-black text-xl border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                      >
                        使用 Google 登入
                      </button>
                    )}
                  </div>

                  <div className="bg-card border-4 border-foreground p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
                    <h3 className="text-xl font-black mb-4">顯示設定</h3>
                    <div className="flex items-center justify-between p-4 border-4 border-foreground bg-muted">
                      <span className="font-black">深色模式 (Dark Mode)</span>
                      <button 
                        disabled={!isPro}
                        onClick={() => {
                          if (!isPro) {
                            setAiMessage("粗哥說：深色模式是 Pro 級特權，保護眼睛也要保護粗哥的錢包喔！");
                            setIsParseError(true); // Show sweating troll
                            setTimeout(() => {
                              setAiMessage(null);
                              setIsParseError(false);
                            }, 5000);
                            return;
                          }
                          toggleDarkMode();
                        }}
                        className={cn(
                          "w-14 h-8 rounded-full border-4 border-foreground relative transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                          isDarkMode ? "bg-green-400" : "bg-muted-foreground"
                        )}
                      >
                        <motion.div 
                          animate={{ x: isDarkMode ? 24 : 0 }}
                          className="absolute top-0.5 left-0.5 w-5 h-5 bg-background border-2 border-foreground rounded-full"
                        />
                      </button>
                    </div>
                    {!isPro && (
                      <p className="text-[10px] font-bold text-red-600 mt-2 italic text-center">
                        「粗哥：沒錢買 Pro 就乖乖看白屏啦！」
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>



      {/* Bro-Navigation Bar */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-background border-t-4 border-foreground flex items-center justify-around px-4 z-40">
        <button 
          onClick={() => { navigate('/'); setCurrentPage('ledger'); setSelectedFriend(null); }}
          className={cn(
            "flex flex-col items-center gap-1 transition-all active:scale-90",
            currentPage === 'ledger' ? "text-foreground scale-110" : "text-muted-foreground"
          )}
        >
          <BriefcaseIcon size={32} strokeWidth={currentPage === 'ledger' ? 3 : 2} />
          <span className={cn("text-[10px] font-black", currentPage === 'ledger' ? "opacity-100" : "opacity-0")}>帳本</span>
        </button>
        
        <button 
          onClick={() => { navigate('/'); setCurrentPage('entry'); setSelectedFriend(null); }}
          className={cn(
            "p-4 rounded-full border-4 border-foreground transition-all active:scale-90 -mt-12 shadow-[0_10px_20px_rgba(0,0,0,0.2)]",
            currentPage === 'entry' ? "bg-foreground text-background" : "bg-background text-foreground"
          )}
        >
          <PlusIcon size={32} strokeWidth={3} />
        </button>

        <button 
          onClick={() => { navigate('/'); setCurrentPage('friends'); setSelectedFriend(null); }}
          className={cn(
            "flex flex-col items-center gap-1 transition-all active:scale-90",
            currentPage === 'friends' ? "text-foreground scale-110" : "text-muted-foreground"
          )}
        >
          <HandshakeIcon size={32} strokeWidth={currentPage === 'friends' ? 3 : 2} />
          <span className={cn("text-[10px] font-black", currentPage === 'friends' ? "opacity-100" : "opacity-0")}>社交圈</span>
        </button>

        <button 
          onClick={() => { navigate('/'); setCurrentPage('profile'); setSelectedFriend(null); }}
          className={cn(
            "flex flex-col items-center gap-1 transition-all active:scale-90",
            currentPage === 'profile' ? "text-foreground scale-110" : "text-muted-foreground"
          )}
        >
          <UserIcon size={32} strokeWidth={currentPage === 'profile' ? 3 : 2} />
          <span className={cn("text-[10px] font-black", currentPage === 'profile' ? "opacity-100" : "opacity-0")}>個人</span>
        </button>
      </div>

      {/* Web Confirmation Page (Absolute Overlay) */}
      <AnimatePresence>
        {currentPage === 'confirm' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-center p-4 overflow-y-auto"
          >
            <MemeCard className="w-full max-w-md text-center sticky-note">
              <h2 className="text-3xl font-sans font-black mb-4 italic">欸！粗哥對帳中...</h2>
              {confirmTx ? (
                <div className="space-y-4">
                  <div className="flex justify-center mb-4">
                    <SuperTroll state={confirmTx.status === 'confirmed' ? 'happy' : 'sweating'} />
                  </div>
                  <p className="text-xl font-sans font-bold">
                    <span className="text-red-500">{confirmTx.creatorName || '某人'}</span> 說你欠他 <span className="underline decoration-red-500 decoration-4 text-2xl font-black">${confirmTx.amount}</span>（<span className="italic">{confirmTx.item}</span>）
                  </p>
                  <p className="text-lg font-black mt-2">你確定嗎？別想賴帳喔！</p>
                  
                  <div className="mt-6 p-4 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-xs font-bold text-gray-500 mb-2">「你也想養一隻粗哥幫你收錢嗎？」</p>
                    <button className="bg-black text-white px-4 py-2 font-black text-sm rounded-full hover:scale-105 transition-transform">
                      點我下載 粗哥 App
                    </button>
                  </div>

                  {aiMessage && (
                    <MonsterSpeechBubble className="mt-4">
                      {aiMessage}
                    </MonsterSpeechBubble>
                  )}
                  <div className="flex flex-col gap-4 mt-8">
                    {confirmTx.status === 'confirmed' ? (
                      <div className="p-4 rough-border-sm bg-green-50 flex flex-col items-center justify-center gap-2 text-green-700 font-bold">
                        <p>確認成功！粗哥摸摸頭。</p>
                        <CheckCircleIcon />
                      </div>
                    ) : (
                      <MemeButton onClick={confirmTransaction} className="w-full bg-red-500 text-white hover:bg-red-600">
                        是的，我承認... (ಥ﹏ಥ)
                      </MemeButton>
                    )}
                    <MemeButton 
                      variant="primary" 
                      onClick={() => setCurrentPage('entry')}
                      className="w-full"
                    >
                      返回首頁
                    </MemeButton>
                  </div>
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-black"></div>
                  <p className="text-xl font-sans font-bold text-gray-400">載入債務詳情中...</p>
                </div>
              )}
            </MemeCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transaction Detail Drawer */}
      <AnimatePresence>
        {selectedTx && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTx(null)}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[55]"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-md bg-background z-[60] flex flex-col shadow-[-10px_0px_50px_rgba(0,0,0,0.3)] border-l-4 border-foreground"
            >
              {/* Close Arrow on the edge */}
              <button 
                onClick={() => setSelectedTx(null)}
                className="absolute -left-10 top-1/2 -translate-y-1/2 w-10 h-20 bg-foreground/40 flex items-center justify-center text-background rounded-l-xl backdrop-blur-md border-l-2 border-y-2 border-background/20"
              >
                <motion.div
                  animate={{ x: [-2, 2, -2] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ChevronLeftIcon size={32} />
                </motion.div>
              </button>

              {/* Drawer Header (粗哥 Style) */}
              <div className="bg-foreground text-background p-4 flex items-center gap-3 shrink-0">
                <div className="w-12 h-12 rounded-full bg-background border-2 border-background overflow-hidden flex items-center justify-center">
                  <SuperTroll state="happy" className="w-20 h-20" />
                </div>
                <h2 className="text-2xl font-black italic tracking-tighter">粗哥</h2>
                <button 
                  onClick={() => setSelectedTx(null)}
                  className="ml-auto w-8 h-8 flex items-center justify-center border-2 border-background bg-foreground text-background hover:bg-background hover:text-foreground transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-muted">
                {/* Ribbon Title */}
                <div className="relative py-6 flex justify-center">
                  <div className="bg-card border-4 border-foreground px-10 py-3 relative z-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
                    <h3 className="text-2xl font-black tracking-tight text-foreground">
                      {isEditing ? '編輯帳務' : `${selectedTx.isPersonal ? '個人' : selectedTx.name} ${selectedTx.item}細項`}
                    </h3>
                  </div>
                  {/* Ribbon Ends - More stylized */}
                  <div className="absolute top-8 left-0 w-12 h-10 bg-muted-foreground/30 border-2 border-foreground -rotate-12 z-0"></div>
                  <div className="absolute top-8 right-0 w-12 h-10 bg-muted-foreground/30 border-2 border-foreground rotate-12 z-0"></div>
                  <div className="absolute top-10 left-4 w-4 h-4 bg-foreground rotate-45 z-0"></div>
                  <div className="absolute top-10 right-4 w-4 h-4 bg-foreground rotate-45 z-0"></div>
                </div>

                <MemeCard className="space-y-6 sticky-note !p-4 bg-card border-4 border-foreground text-foreground">
                  {isEditing ? (
                    <div className="space-y-6 p-4">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase opacity-40">項目名稱</label>
                        <input 
                          type="text"
                          value={editData.item}
                          onChange={(e) => setEditData({ ...editData, item: e.target.value })}
                          className="w-full border-4 border-foreground p-4 text-xl font-black focus:outline-none focus:ring-4 focus:ring-yellow-400 bg-background text-foreground"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase opacity-40">金額</label>
                        <input 
                          type="number"
                          value={editData.amount}
                          onChange={(e) => setEditData({ ...editData, amount: parseInt(e.target.value) || 0 })}
                          className="w-full border-4 border-foreground p-4 text-xl font-black focus:outline-none focus:ring-4 focus:ring-yellow-400 bg-background text-foreground"
                        />
                      </div>
                      <div className="flex gap-4 pt-4">
                        <button 
                          onClick={() => setIsEditing(false)}
                          className="flex-1 py-4 border-4 border-foreground bg-background text-foreground font-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                        >
                          取消
                        </button>
                        <button 
                          onClick={handleEditTx}
                          className="flex-1 py-4 border-4 border-foreground bg-yellow-400 text-black font-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                        >
                          儲存修改
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 border-4 border-foreground p-5 bg-background shadow-[inset_0_0_20px_rgba(0,0,0,0.05)]">
                        <div className="flex justify-between items-end border-b-4 border-foreground pb-3">
                          <span className="text-xl font-black">對象:</span>
                          <span className="text-2xl font-black">{selectedTx.isPersonal ? '個人' : selectedTx.name}</span>
                        </div>
                        <div className="flex justify-between items-end border-b-4 border-foreground pb-3">
                          <span className="text-xl font-black">項目:</span>
                          <span className="text-2xl font-black">{selectedTx.item}</span>
                        </div>
                        {selectedTx.tag && (
                          <div className="flex justify-between items-end border-b-4 border-foreground pb-3">
                            <span className="text-xl font-black">標籤:</span>
                            <span className="text-2xl font-black text-blue-600">#{selectedTx.tag}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-end pt-1">
                          <span className="text-xl font-black">總額:</span>
                          <span className={cn(
                            "text-3xl font-black",
                            (selectedTx.type === '借出' || selectedTx.type === '個人收入' || (selectedTx.isPersonal && selectedTx.amount > 0)) ? "text-green-600" : "text-red-600"
                          )}>
                            {selectedTx.isPersonal ? (selectedTx.amount > 0 ? '+' : '') : (selectedTx.type === '個人支出' ? '-' : selectedTx.type === '個人收入' ? '+' : '')}${selectedTx.amount}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4 pt-4">
                        <div className="flex justify-between text-xs font-black opacity-60 uppercase border-b-4 border-foreground pb-2">
                          <span className="w-24">時間</span>
                          <span className="flex-1 text-center">項目</span>
                          <span className="w-16 text-right">金額</span>
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center gap-2">
                            <div className="text-xs font-mono font-bold leading-tight w-24">
                              {new Date(selectedTx.createdAt).toLocaleDateString()}<br/>
                              {new Date(selectedTx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="flex-1 text-base font-black text-center">
                              {selectedTx.item}
                            </div>
                            <div className="text-xl font-black w-16 text-right">
                              ${selectedTx.amount}
                            </div>
                          </div>
                          
                          <div className="border-t-4 border-foreground pt-3 flex justify-between items-center">
                            <span className="text-lg font-black">總計</span>
                            <span className="text-2xl font-black">${selectedTx.amount}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end py-2 pr-4 relative">
                        <div className="relative scale-110">
                          <SuperTroll state={selectedTx.status === 'confirmed' ? 'happy' : 'sweating'} className="w-48 h-48" />
                          {selectedTx.status === 'confirmed' && (
                            <motion.div 
                              initial={{ scale: 0, rotate: 0 }}
                              animate={{ scale: 1, rotate: 12 }}
                              className="absolute top-4 right-4 bg-red-600 text-white text-xs font-black px-3 py-1 border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                              對帳成功！
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-4 pt-2">
                    {!selectedTx.isPersonal && selectedTx.status !== 'settled' && (
                      <button 
                        onClick={() => toggleStatus(selectedTx.id)}
                        className={cn(
                          "w-full py-4 border-4 border-foreground font-black text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-3",
                          selectedTx.status === 'confirmed' ? "bg-[#4ade80]" : "bg-yellow-400 text-black"
                        )}
                      >
                        <CheckCircleIcon size={28} />
                        {selectedTx.status === 'confirmed' ? '結清此筆帳務' : '標記為confirmed'}
                      </button>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => {
                          setEditData({ item: selectedTx.item, amount: selectedTx.amount });
                          setIsEditing(true);
                        }}
                        className="py-3 border-4 border-foreground bg-blue-400 text-white font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2"
                      >
                        編輯
                      </button>
                      <button 
                        onClick={() => shareLink(selectedTx.id)}
                        className="py-3 border-4 border-foreground bg-background text-foreground font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2"
                      >
                        <Share2Icon size={20} /> 分享
                      </button>
                    </div>

                    <button 
                      onClick={() => handleDelete(selectedTx.id)}
                      className="w-full py-3 border-4 border-black bg-red-400 font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2"
                    >
                      <Trash2Icon size={20} /> 丟進回收桶
                    </button>
                  </div>
                </MemeCard>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Confirmation Dialog for Recycle Bin */}
      <AnimatePresence>
        {pendingAction && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPendingAction(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-white border-4 border-black p-6 z-[101] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <SuperTroll state={pendingAction.action === 'force-delete' ? 'shocked' : 'sweating'} className="w-32 h-32" />
                <h3 className="text-2xl font-black italic">
                  {pendingAction.action === 'force-delete' ? '粗哥警告：這次刪了就真的救不回來了喔！' : '真的要把它丟進回收桶嗎？'}
                </h3>
                <p className="text-sm font-bold opacity-60">
                  {pendingAction.action === 'force-delete' ? '此操作將從資料庫永久抹除該筆紀錄。' : 
                   pendingAction.action === 'delete' ? '這筆帳務將會被標記為deleted。' : '這筆帳務將會被標記為settled。'}
                </p>
                <div className="flex gap-4 w-full mt-2">
                  <button 
                    onClick={() => setPendingAction(null)}
                    className="flex-1 py-3 border-4 border-black bg-white font-black hover:bg-gray-100 transition-all"
                  >
                    先不要
                  </button>
                  <button 
                    onClick={handleConfirmAction}
                    className={cn(
                      "flex-1 py-3 border-4 border-black font-black transition-all",
                      pendingAction.action === 'force-delete' ? "bg-red-500 text-white" : "bg-black text-white"
                    )}
                  >
                    {pendingAction.action === 'force-delete' ? '確定刪除' : '丟掉！'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}


const RecycleBinScreen = () => <MainScreen initialPath='/recycle-bin' />;

export default function AppRoutes() {
  const path = window.location.pathname === '/recycle-bin' ? '/recycle-bin' : '/';

  const routes: Record<'/' | '/recycle-bin', React.ReactNode> = {
    '/': <MainScreen initialPath='/' />,
    '/recycle-bin': <RecycleBinScreen />,
  };

  return <>{routes[path]}</>;
}
