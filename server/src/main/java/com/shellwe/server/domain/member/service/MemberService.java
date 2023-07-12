package com.shellwe.server.domain.member.service;

import com.shellwe.server.domain.member.dto.request.DeleteRequestDto;
import com.shellwe.server.domain.member.dto.request.SignUpRequestDto;
import com.shellwe.server.domain.member.dto.request.UpdateRequestDto;
import com.shellwe.server.domain.member.dto.response.FindResponseDtoIncludeOauth;
import com.shellwe.server.domain.member.dto.response.GetMyShellListDto;
import com.shellwe.server.domain.member.entity.Member;
import com.shellwe.server.domain.member.mapper.MemberMapper;
import com.shellwe.server.domain.member.repository.MemberRepository;
import com.shellwe.server.domain.shell.entity.Shell;
import com.shellwe.server.domain.types.Status;
import com.shellwe.server.email.EmailSendable;
import com.shellwe.server.file.UploadPictureService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Slf4j
@Transactional
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;
    private final EmailSendable emailSendable;
    private final UploadPictureService uploadPictureService;

    @Autowired
    public MemberService(MemberRepository memberRepository, MemberMapper memberMapper,
                         PasswordEncoder passwordEncoder, EmailSendable emailSendable,
                         UploadPictureService uploadPictureService) {
        this.memberRepository = memberRepository;
        this.memberMapper = memberMapper;
        this.passwordEncoder = passwordEncoder;
        this.emailSendable = emailSendable;
        this.uploadPictureService = uploadPictureService;
    }

    public void signUpMember(SignUpRequestDto signUpRequestDto) throws InterruptedException {
        Member member = memberMapper.signUpRequestDtoToMember(signUpRequestDto);
        log.info("sign-up in service layer start, member : {}", member);
        verifyExistEmail(member.getEmail());

        Member encryptedMember = new Member(member, passwordEncoder.encode(member.getPassword()));
        memberRepository.save(encryptedMember);

        new Thread(() -> {
            try {
                emailSendable.send(new String[]{member.getEmail()}, "ShellWe 회원가입 인증",
                        member.getEmail(), "email-registration-member");
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }).start();
        log.info("sent email and sign-up in service layer done");
    }

    public void verifyEmail(String email) {
        Member findMember = findByEmail(email);

        findMember.emailVerificationCompleted();
        memberRepository.save(findMember);

        log.info("email verification completed");
    }

    @Transactional(readOnly = true)
    public FindResponseDtoIncludeOauth findMemberById(Long contextId, Long memberId) {
        log.info("find member in service layer by Id start, memberId : {}", memberId);
        FindResponseDtoIncludeOauth findResponseDtoIncludeOauth = new FindResponseDtoIncludeOauth();

        if (contextId == null) {
            Member findMember = findById(memberId);
            findResponseDtoIncludeOauth.setIsMeIdName(false, findMember.getId(), findMember.getDisplayName());
            if (findMember.isPasswordNull()) {
                findResponseDtoIncludeOauth.setOauthUser(true);
            }
            return findResponseDtoIncludeOauth;
        }
        if (!contextId.equals(memberId)) {
            Member findMember = findById(memberId);
            findResponseDtoIncludeOauth.setIsMeIdName(false, findMember.getId(), findMember.getDisplayName());
            return findResponseDtoIncludeOauth;
        }
        if (contextId.equals(memberId)) {
            Member findMember = findById(memberId);
            findResponseDtoIncludeOauth.setIsMeIdName(true, findMember.getId(), findMember.getDisplayName());
            if (findMember.isPasswordNull()) {
                findResponseDtoIncludeOauth.setOauthUser(true);
            }
            return findResponseDtoIncludeOauth;
        }

        return findResponseDtoIncludeOauth;
    }

    public void updateMember(long contextId, long memberId, UpdateRequestDto updateRequestDto, MultipartFile picture) {
        log.info("update member in service layer start");
        String profileUrl = null;

        if (memberId == contextId) {
            Member findMember = findById(memberId);
            if (!picture.isEmpty()) {
                profileUrl = uploadPictureService.onePictureFileToUrl(picture);
            }
            findMember.updateMember(updateRequestDto.getPassword(), passwordEncoder,
                    updateRequestDto.getDisplayName(), updateRequestDto.getIntroduction(), profileUrl);
            memberRepository.save(findMember);
        } else {
            throw new IllegalStateException("자신의 아이디만 수정 가능합니다.");
        }

        log.info("update member in service layer end");
    }

    public void deleteMember(long contextId, long memberId, DeleteRequestDto deleteRequestDto) {
        log.info("delete member in service layer start");
        Member findMember = findById(contextId);

        if (memberId == contextId && passwordEncoder.matches(deleteRequestDto.getPassword(), findMember.getPassword())) {
            memberRepository.delete(findMember);
        } else {
            throw new IllegalStateException("자신의 아이디만 삭제 가능합니다.");
        }

        log.info("delete member in service layer end");
    }

    @Transactional(readOnly = true)
    public Member getMemberByOtherLayer(long memberId) {
        return findById(memberId);
    }

    @Transactional(readOnly = true)
    public GetMyShellListDto myShellList(long memberId, Status status, long contextId) {
        GetMyShellListDto getMyShellListDto = new GetMyShellListDto();
        if (memberId == contextId) {
            Member member = findById(memberId);
            if (status == Status.ACTIVE) {
                List<Shell> activeShellList = member.getActiveList();
                getMyShellListDto.setShells(memberMapper.shellListToGetMyShellListDto(activeShellList));
            }
            if (status == Status.INACTIVE) {
                List<Shell> activeShellList = member.getInActiveList();
                getMyShellListDto.setShells(memberMapper.shellListToGetMyShellListDto(activeShellList));
            }
        } else {
            throw new IllegalStateException("자신의 쉘만 조회할 수 있습니다.");
        }
        return getMyShellListDto;
    }

    @Transactional(readOnly = true)
    public GetMyShellListDto myShellListUnAuthentication(long memberId, Status status) {
        GetMyShellListDto getMyShellListDto = new GetMyShellListDto();

        Member member = findById(memberId);
        if (status == Status.ACTIVE) {
            List<Shell> activeShellList = member.getActiveList();
            getMyShellListDto.setShells(memberMapper.shellListToGetMyShellListDto(activeShellList));
        }
        if (status == Status.INACTIVE) {
            List<Shell> activeShellList = member.getInActiveList();
            getMyShellListDto.setShells(memberMapper.shellListToGetMyShellListDto(activeShellList));
        }
        return getMyShellListDto;
    }

    private Member findByEmail(String email) {
        Optional<Member> byEmail = memberRepository.findByEmail(email);
        Member member = byEmail.orElseThrow(() -> new IllegalStateException());
        return member;
    }

    private Member findById(long memberId) {
        Optional<Member> byId = memberRepository.findById(memberId);
        Member member = byId.orElseThrow(() -> new IllegalStateException());
        return member;
    }

    private void verifyExistEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);

        if (member.isPresent()) {
            throw new IllegalStateException();
        }
    }
}
