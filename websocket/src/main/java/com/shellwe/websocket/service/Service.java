package com.shellwe.websocket.service;


import com.shellwe.websocket.auth.memberDetails.MemberContextInform;
import com.shellwe.websocket.dto.ChatRoom;
import com.shellwe.websocket.dto.MemberDto;
import com.shellwe.websocket.dto.QueryDto;
import com.shellwe.websocket.entity.Member;
import com.shellwe.websocket.entity.MemberRoom;
import com.shellwe.websocket.entity.Message;
import com.shellwe.websocket.entity.Room;
import com.shellwe.websocket.exception.businessLogicException.BusinessLogicException;
import com.shellwe.websocket.exception.businessLogicException.ExceptionCode;
import com.shellwe.websocket.mapper.RoomMapper;
import com.shellwe.websocket.repository.MemberRepository;
import com.shellwe.websocket.repository.MemberRoomRepository;
import com.shellwe.websocket.repository.MessageRepository;
import com.shellwe.websocket.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@org.springframework.stereotype.Service
public abstract class Service {
    protected final MemberRoomRepository memberRoomRepository;
    protected final MemberRepository memberRepository;
    protected final RoomRepository roomRepository;
    protected final MessageRepository messageRepository;
    protected final RoomMapper roomMapper;
    protected Member findExistsMember(long memberId){
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        return optionalMember.orElseThrow(()->new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }
    protected MemberRoom findExistsMemberRoom(long roomId, long memberId){
        Optional<MemberRoom> optionalMemberRoom = memberRoomRepository.findByRoomAndMemberAndActiveTrue(new Room(roomId), new Member(memberId));
        return optionalMemberRoom.orElseThrow(()->new BusinessLogicException(ExceptionCode.MEMBER_ROOM_NOT_FOUND));
    }

    protected void verifyExistsMemberRoom(long myShellId, long traderShellId){
        Optional<MemberRoom> memberRoom = memberRoomRepository.findFirstByMyShellIdAndTraderShellId(myShellId,traderShellId);

        memberRoom.ifPresent((mr)->{
            if(mr.isActive()) throw new BusinessLogicException(ExceptionCode.MEMBER_ROOM_EXISTS);
        });
    }

    protected ChatRoom joinRoom(WebSocketSession session, Map<Long, ChatRoom> chatRooms,long roomId){
        if(chatRooms.containsKey(roomId)){
            chatRooms.get(roomId).setSessions(session);
        }else {
            ChatRoom chatRoom = new ChatRoom(roomId);
            chatRoom.setSessions(session);
            chatRooms.put(roomId, chatRoom);
        }
        return chatRooms.get(roomId);
    }

    protected MemberDto.Response getMemberResponse(WebSocketSession session){
        Authentication authentication = (Authentication) session.getPrincipal();
        MemberContextInform member =  (MemberContextInform) authentication.getPrincipal();
        MemberDto.Response memberResponse = roomMapper.memberContextToMemberResponse(member);
        return memberResponse;
    }
    protected long getLoggedInMemberId(){
        Authentication authentication = (Authentication) SecurityContextHolder.getContext().getAuthentication();
        MemberContextInform member =  (MemberContextInform) authentication.getPrincipal();
        return member.getId();
    }
    protected long getRoomId(WebSocketSession session){
        try{
            String roomId = Arrays.stream(session.getUri().getQuery().split("&")).filter(s->s.startsWith("roomId"))
                    .collect(Collectors.toList())
                    .get(0)
                    .replace("roomId=","");
            return Long.parseLong(roomId);
        }catch(Exception e){
            throw new BusinessLogicException(ExceptionCode.WRONG_ROOM_NUMBER);
        }
    }
}
