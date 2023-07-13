package com.shellwe.websocket.service;

import com.shellwe.websocket.dto.ChatRoom;
import com.shellwe.websocket.dto.MemberDto;
import com.shellwe.websocket.mapper.RoomMapper;
import com.shellwe.websocket.repository.MemberRepository;
import com.shellwe.websocket.repository.MemberRoomRepository;
import com.shellwe.websocket.repository.MessageRepository;
import com.shellwe.websocket.repository.RoomRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

@Slf4j
@org.springframework.stereotype.Service
public class WsRoomService extends Service{
    public Map<Long, ChatRoom> chatRoomSessions = new LinkedHashMap<>();
    public WsRoomService(MemberRoomRepository memberRoomRepository,
                         MemberRepository memberRepository,
                         RoomRepository roomRepository,
                         MessageRepository messageRepository,
                         RoomMapper roomMapper) {
        super(memberRoomRepository, memberRepository, roomRepository, messageRepository, roomMapper);
    }

    public void getRoomInfo(WebSocketSession session) throws IOException {
        long roomId = getRoomId(session);
        joinRoom(session, chatRoomSessions, roomId);
        session.sendMessage(new TextMessage(session.getId()));
    }

    public void terminateSession(WebSocketSession session){
        long roomId = getRoomId(session);
        chatRoomSessions.get(roomId).removeSession(session);
        if(chatRoomSessions.get(roomId).getSessions().size()==0) chatRoomSessions.remove(roomId);
    }
}
